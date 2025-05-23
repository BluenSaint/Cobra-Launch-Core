import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  
  // Swagger documentation setup
  const config = new DocumentBuilder()
    .setTitle('Project Cobra API')
    .setDescription('API documentation for the Project Cobra platform')
    .setVersion('1.0')
    .addTag('ocr', 'OCR processing endpoints')
    .addTag('auth', 'Authentication endpoints')
    .addTag('disputes', 'Dispute management endpoints')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`API documentation available at: http://localhost:${port}/api/docs`);
}
bootstrap();
