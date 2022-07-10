import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer, ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // class-validator container for dep injection on validators
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

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
