import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { NestApplicationOptions } from '@nestjs/common';

const appOptions: NestApplicationOptions | undefined =
  process.env.NODE_ENV === 'production'
    ? {
        logger: ['warn', 'error', 'fatal'],
      }
    : undefined;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, appOptions);

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Utility WebApi')
    .setDescription(
      'Utility for daily operations like chart generations or pdf generations',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
