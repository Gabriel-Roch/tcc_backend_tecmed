import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BloodController } from './controller/blood.controller';
import { MasterBloodService } from './services/masterBlood.service';
import { PrismaService } from './services/prisma.service';


@Module({
  imports: [],
  controllers: [
    AppController,
    BloodController
  ],
  providers: [
    AppService,
    MasterBloodService,
    PrismaService
  ],
})
export class AppModule { }
