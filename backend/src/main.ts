import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Enable CORS FIRST with a dynamic origin reflector
  app.enableCors({
    origin: true, // This automatically allows whichever origin is calling it (safest for debugging)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With',
  });

  // 2. Set the API prefix
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 4001;
  await app.listen(port, '0.0.0.0'); // 0.0.0.0 is better for Railway deployments
  console.log(`🚀 API active at: http://0.0.0.0:${port}/api`);
}

bootstrap();