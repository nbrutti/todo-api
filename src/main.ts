import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT, HOST);
}
bootstrap();
