import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { TreatmentsModule } from './treatments/treatments.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { ContactsModule } from './contacts/contacts.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    PostsModule,
    CategoriesModule,
    TagsModule,
    TreatmentsModule,
    WebhooksModule,
    ContactsModule,
    AppointmentsModule,
    AdminModule,
  ],
})
export class AppModule {}
