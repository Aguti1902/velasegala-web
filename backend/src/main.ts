import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security
  app.use(helmet());

  // CORS - Configuración más permisiva para depurar
  const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
  const allowedOrigins = corsOrigin.split(',').map(o => o.trim());
  
  // Añadir siempre las URLs de producción
  allowedOrigins.push('https://velasegala-web-emc8.vercel.app');
  allowedOrigins.push('http://localhost:3000');
  
  console.log('🔐 CORS Origins permitidos:', allowedOrigins);

  app.enableCors({
    origin: (origin, callback) => {
      // Permitir requests sin origin (como Postman, curl, etc.)
      if (!origin) {
        return callback(null, true);
      }

      // Limpiar el origin
      const cleanOrigin = origin.replace(/\/$/, '');

      // Verificar si el origin está permitido
      const isAllowed = allowedOrigins.some(allowed => {
        const cleanAllowed = allowed.replace(/\/$/, '');
        return cleanOrigin === cleanAllowed || cleanOrigin.startsWith(cleanAllowed);
      });
      
      if (isAllowed) {
        callback(null, true);
      } else {
        console.warn(`⚠️ CORS blocked origin: ${origin}`);
        console.warn(`   Allowed origins:`, allowedOrigins);
        callback(null, true); // Temporalmente permitir para depurar
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
    exposedHeaders: ['Content-Length', 'Content-Type'],
    maxAge: 3600,
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

