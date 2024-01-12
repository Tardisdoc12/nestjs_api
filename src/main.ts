import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { IncomingMessage, ServerResponse } from 'http';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  // Configuration Swagger
  const options = new DocumentBuilder()
    .setTitle('Nest.js API')
    .setDescription('The Nest.js API description')
    .setVersion('1.0')
    .addTag('tags')
    .build();


  app.use(
    morgan<IncomingMessage, ServerResponse>('combined', {
      stream: {
        write: (message) => {
          logger.log(message);
        },
      },
    }),
  );
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
