import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security
  app.use(helmet());

  // CORS - Configuración flexible
  const allowedOrigins = [
    'http://localhost:3000',
    'https://velasegala-web-emc8.vercel.app',
    process.env.CORS_ORIGIN,
  ]
    .filter((origin): origin is string => Boolean(origin)) // Type guard para filtrar undefined
    .map(origin => origin.replace(/\/$/, '')); // Quitar barra final

  app.enableCors({
    origin: (origin, callback) => {
      // Permitir requests sin origin (como Postman, curl, etc.)
      if (!origin) {
        return callback(null, true);
      }

      // Quitar barra final del origin
      const cleanOrigin = origin.replace(/\/$/, '');

      // Verificar si el origin está permitido
      if (allowedOrigins.some(allowed => cleanOrigin === allowed || cleanOrigin.startsWith(allowed))) {
        callback(null, true);
      } else {
        console.warn(`⚠️ CORS blocked origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // API prefix
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 Backend running on http://localhost:${port}/api`);
}

bootstrap();

