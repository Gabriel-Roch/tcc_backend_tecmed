import { Module } from '@nestjs/common';
import { BloodController } from './controller/blood.controller';
import { MasterBloodService } from './services/masterBlood.service';
import { PrismaService } from './services/prisma.service';
import { PatientController } from './controller/patient.controller';
import { PatientService } from './services/patient.service';
import { IndexController } from './controller/index.controller';


@Module({
  imports: [],
  controllers: [
    BloodController,
    PatientController,
    IndexController
  ],
  providers: [
    MasterBloodService,
    PrismaService,
    PatientService
  ],
})
export class AppModule { }
