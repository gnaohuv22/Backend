import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blog page for JS Club')
    .setDescription('A simply demo for JS Club testing round')
    .setVersion('0.12.2')
    .addTag('why am i doing this?')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  app.enableCors();
  await app.listen(3001);
  
}
bootstrap();