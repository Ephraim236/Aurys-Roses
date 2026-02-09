import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // This adds the FIRST '/api'
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: 'https://aurys-roses-production.up.railway.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT || 4001, '0.0.0.0');
}
bootstrap();