import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/app/common/dto/pagination.dto';
import { AddHeaderInterceptor } from 'src/app/common/interceptors/add-header-interceptor';
import { TimingConnectionInterceptor } from 'src/app/common/interceptors/timing-connections-interceptor';
import { ErrorHandlingInterceptor } from 'src/app/common/interceptors/error-handling.interceptor';

// CRUD
// Create -> POST -> Criar um recado
// Read -> GET -> Ler todos os recados
// Read -> GET -> Ler apenas um recado
// Update -> PATCH / PUT -> Atualizar um recado
// Delete -> DELETE -> Apagar um recado

// PATCH é utilizado para atualizar dados de um recurso
// PUT é utilizado para atualizar um recurso inteiro

// DTO - Data Transfer Object -> Objeto de transferência de dados
// DTO -> Objeto simples -> Validar dados / Transformar dados

@Controller('recados')
export class RecadosController {
    constructor(private readonly recadosService: RecadosService) {}

    @HttpCode(HttpStatus.OK)
    @UseInterceptors(TimingConnectionInterceptor, ErrorHandlingInterceptor)
    @Get()
    async findAll(@Query() paginationDto: PaginationDto) {
        // return `Retorna todos os recados. Limit=${limit}, Offset=${offset}.`;
        const recados = await this.recadosService.findAll(paginationDto);
        return recados;
    }
    @UseInterceptors(AddHeaderInterceptor, ErrorHandlingInterceptor)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.recadosService.findOne(+id);
    }

    @Post()
    create(@Body() createRecadoDto: CreateRecadoDto) {
        return this.recadosService.create(createRecadoDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateRecadoDto: UpdateRecadoDto) {
        return this.recadosService.update(id, updateRecadoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.recadosService.remove(id);
    }
}
