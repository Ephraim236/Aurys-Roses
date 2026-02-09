import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Set the global prefix so all routes start with /api
  app.setGlobalPrefix('api');

  // 2. Configure CORS to allow your production link
  app.enableCors({
    origin: [
      'https://aurys-roses-production.up.railway.app', // ✅ Your main production link
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
  });

  // 3. Bind to 0.0.0.0 for Railway deployment
  const port = process.env.PORT || 4001;
  await app.listen(port, '0.0.0.0');
  console.log(`✅ Production Backend live on port ${port}`);
}

bootstrap();