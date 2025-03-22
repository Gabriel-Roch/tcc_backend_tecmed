import { Test, TestingModule } from '@nestjs/testing';
import { MedicineProductController } from './medicine-product.controller';

describe('MedicineProductController', () => {
  let controller: MedicineProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicineProductController],
    }).compile();

    controller = module.get<MedicineProductController>(MedicineProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
