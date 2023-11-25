import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('To Do List')
  .setDescription('Public Management Council')
  .setVersion('1.0')
  .addTag('PMC')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);
  let port=process.env.PORT || 4000
  app.enableCors()
  await app.listen(port);
  console.log("Port",port)
}
bootstrap();
