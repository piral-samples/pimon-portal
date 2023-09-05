import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('pimon-portal API')
    .setDescription('The Pimon Portal API.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('swagger', app, swaggerDocument);

  await app.listen(4000);
}

bootstrap();
