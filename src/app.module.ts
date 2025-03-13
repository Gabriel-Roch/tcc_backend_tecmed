import { Module } from '@nestjs/common';
import { BloodController } from './controller/blood/blood.controller';
import { MasterBloodService } from './services/masterBlood/masterBlood.service';
import { PrismaService } from './services/prisma/prisma.service';
import { PatientController } from './controller/patient/patient.controller';
import { PatientService } from './services/patient/patient.service';
import { IndexController } from './controller/index/index.controller';
import { UserController } from './controller/user/user.controller';
import { UserService } from './services/user/user.service';
import { AuthModule } from './module/auth/auth.module';
import { AgreementController } from './controller/agreement/agreement.controller';
import { AgreementService } from './services/agreement/agreement.service';


@Module({
  imports: [AuthModule],
  controllers: [
    BloodController,
    PatientController,
    IndexController,
    UserController,
    AgreementController
  ],
  providers: [
    MasterBloodService,
    PrismaService,
    PatientService,
    UserService,
    AgreementService
  ],
})
export class AppModule { }
