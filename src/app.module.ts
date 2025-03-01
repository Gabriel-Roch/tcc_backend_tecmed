import { Module } from '@nestjs/common';
import { BloodController } from './controller/blood.controller';
import { MasterBloodService } from './services/masterBlood.service';
import { PrismaService } from './services/prisma.service';
import { PatientController } from './controller/patient.controller';
import { PatientService } from './services/patient.service';
import { IndexController } from './controller/index.controller';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';


@Module({
  imports: [],
  controllers: [
    BloodController,
    PatientController,
    IndexController,
    UserController
  ],
  providers: [
    MasterBloodService,
    PrismaService,
    PatientService,
    UserService
  ],
})
export class AppModule { }
