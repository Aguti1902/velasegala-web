import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security
  app.use(helmet());

  // CORS - Permitir frontend de Vercel y desarrollo local
  const allowedOrigins = [
    'https://velasegala-web-emc8.vercel.app',
    'http://localhost:3000',
  ];
  
  // Añadir CORS_ORIGIN de variables de entorno si existe
  if (process.env.CORS_ORIGIN) {
    const customOrigins = process.env.CORS_ORIGIN.split(',').map(o => o.trim());
    allowedOrigins.push(...customOrigins);
  }
  
  console.log('🔐 CORS Origins permitidos:', allowedOrigins);

  app.enableCors({
    origin: (origin, callback) => {
      // Permitir requests sin origin (como Postman, curl, etc.)
      if (!origin) {
        return callback(null, true);
      }

      // Limpiar trailing slashes
      const cleanOrigin = origin.replace(/\/$/, '');

      // Verificar si está en la lista de permitidos
      const isAllowed = allowedOrigins.some(allowed => {
        const cleanAllowed = allowed.replace(/\/$/, '');
        return cleanOrigin === cleanAllowed;
      });
      
      if (isAllowed) {
        callback(null, true);
      } else {
        console.warn(`⚠️ CORS blocked origin: ${origin}`);
        console.warn(`   Allowed origins:`, allowedOrigins);
        // En producción, bloquear; en desarrollo, permitir
        callback(null, process.env.NODE_ENV !== 'production');
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key', 'Accept'],
    exposedHeaders: ['Content-Length', 'Content-Type'],
    maxAge: 7200,
    preflightContinue: false,
    optionsSuccessStatus: 204,
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

