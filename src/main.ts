import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer, ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // class-validator container for dep injection on validators
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // swagger docs
  const config = new DocumentBuilder()
    .setTitle('Nestjs Rest tutorial')
    .setDescription('Sample app for learning nestjs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  // edit validator responses
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error) => {
            delete error.target;
            delete error.children;
            delete error.value;
            return error;
          }),
        );
      },
    }),
  );

  app.use(cookieParser());
  await app.listen(4455);
}
bootstrap();
