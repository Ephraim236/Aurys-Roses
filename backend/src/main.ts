import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'https://aurys-roses-production.up.railway.app',  // ✅ ADDED THIS LINE
      'https://aurys-roses-staging.up.railway.app',
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
  });

  const port = process.env.PORT || 4001;
  await app.listen(port);
  console.log(`✅ Backend securely accepting requests on port ${port}`);
}

bootstrap();