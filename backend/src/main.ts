import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Enable CORS for BOTH production and staging origins
  app.enableCors({
    origin: [
      'https://aurys-roses-production.up.railway.app',
      'https://aurys-roses-staging.up.railway.app',
      'http://localhost:3000'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // 2. DO NOT use setGlobalPrefix('api') here anymore. 
  // We will put '/api' directly in the Controller to avoid confusion.

  const port = process.env.PORT || 4001;
  
  // 3. Bind to 0.0.0.0 for Railway
  await app.listen(port, '0.0.0.0');
  console.log(`✅ Backend is active on port ${port}`);
}
bootstrap();