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
import { MedicineManufacturerController } from './controller/medicine_manufacturer/medicine_manufacturer.controller';
import { MedicineManufacturerService } from './services/medicine_manufacturer/medicine_manufacturer.service';
import { MedicineProductService } from './services/medicine_products/medicine_products.service';
import { MedicineProductController } from './controller/medicine-product/medicine-product.controller';

@Module({
  imports: [AuthModule],
  controllers: [
    BloodController,
    PatientController,
    IndexController,
    UserController,
    AgreementController,
    MedicineManufacturerController,
    MedicineProductController
  ],
  providers: [
    MasterBloodService,
    PrismaService,
    PatientService,
    UserService,
    AgreementService,
    MedicineManufacturerService,
    MedicineProductService
  ],
})
export class AppModule { }
