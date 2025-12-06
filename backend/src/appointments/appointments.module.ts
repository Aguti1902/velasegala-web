import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AppointmentsController],
})
export class AppointmentsModule {}

