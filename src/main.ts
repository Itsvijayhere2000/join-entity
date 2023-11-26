import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config as awsConfig } from 'aws-sdk';

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
  app.enableCors(
    {
      origin: true,
    credentials: true,
    }
  )
  await app.listen(port);
  console.log("Port",port)

  awsConfig.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
}
bootstrap();
