import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(`JS Club's Blog`)
    .setDescription('A simply demo for JS Club testing round')
    .setVersion('0.16.1')
    .addTag('nani')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  app.enableCors();
  await app.listen(3001);
  
}
bootstrap();