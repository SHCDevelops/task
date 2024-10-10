import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const host: string = configService.get<string>('app.http.host');
  const port: number = configService.get<number>('app.http.port');

  const logger = new Logger();

  // Swagger
  // await swaggerInit(app);

  await app.listen(port, host);

  logger.log(`==========================================================`);
  logger.log(
    `Http Server running on ${await app.getUrl()}`,
    'NestApplication'
  );
  logger.log(`==========================================================`);
}
bootstrap();
