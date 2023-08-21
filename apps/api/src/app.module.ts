import { Module } from '@nestjs/common';
import AdminsModule from './admins/admins.module';
import AppController from './app.controller';
import AppService from './app.service';
import AuthModule from './auth/auth.module';
import ClientsModule from './clients/clients.module';
import MaterialsModule from './materials/materials.module';
import PrismaModule from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    AdminsModule,
    MaterialsModule,
    ClientsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export default class AppModule {}
