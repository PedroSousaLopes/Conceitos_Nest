import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ParseIntIdPipe } from './app/common/pipes/parse-int-id.pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // remove chaves que não estão no DTO
            forbidNonWhitelisted: true, // levantar erro quando a chave não existir
            transform: false, // tenta transformar os tipos de dados de param e dtos
        }),
        new ParseIntIdPipe(),
    );

    await app.listen(3000);
}
bootstrap();
