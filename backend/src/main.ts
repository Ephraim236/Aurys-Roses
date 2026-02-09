import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Enable CORS for production, staging, and local environments
  app.enableCors({
    origin: [
      'https://aurys-roses-production.up.railway.app', // ✅ Allow Production
      'https://aurys-roses-staging.up.railway.app',    // ✅ Allow Staging
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // 2. Set the global prefix so all routes start with /api
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 4001;
  await app.listen(port, '0.0.0.0'); 
  console.log(`🚀 Backend is active at: https://aurys-roses-staging.up.railway.app/api`);
}
bootstrap();