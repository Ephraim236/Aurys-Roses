import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // This ensures all your endpoints start with /api
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'https://aurys-roses-staging.up.railway.app',
      'http://localhost:3000', // Your React/Vite local URL
      'http://localhost:3001',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = process.env.PORT || 4001;
  await app.listen(port);
  console.log(`✅ Server running on: http://localhost:${port}/api`);
}

bootstrap();