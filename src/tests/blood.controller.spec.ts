import { Test, TestingModule } from "@nestjs/testing";
import { BloodController } from "../controller/blood.controller";
import { MasterBloodService } from "../services/masterBlood.service";

describe('MasterBlood', () => {
    let bloodController: BloodController;
    let masterBloodService: MasterBloodService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [BloodController],
            providers: [
                {
                    provide: MasterBloodService,
                    useValue: {
                        getAllMasters: jest.fn().mockResolvedValue([
                            { id_b: 1, b_name: 'A+', b_active: true },
                            { id_b: 2, b_name: 'O-', b_active: true }
                        ])
                    }
                }
            ],
        }).compile();

        bloodController = app.get<BloodController>(BloodController);
        masterBloodService = app.get<MasterBloodService>(MasterBloodService);
    });

    describe('getAll', () => {
        it('deve retornar uma lista de tipos sanguíneos', async () => {
            const result = await bloodController.getAll();

            expect(result).toEqual(expect.arrayContaining([
                { id_b: 1, b_name: 'A+', b_active: true },
                { id_b: 2, b_name: 'O-', b_active: true }
            ]));

            expect(masterBloodService.getAllMasters).toHaveBeenCalledTimes(1);
        });
    });
});
