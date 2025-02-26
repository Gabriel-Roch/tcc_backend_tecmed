import { Controller, Get } from '@nestjs/common';
import { master_blood } from '@prisma/client';
import { MasterBloodService } from '../services/masterBlood.service';

@Controller()
export class BloodController {

    constructor(private readonly masterBloodService: MasterBloodService) { }

    @Get()
    async getAll(): Promise<master_blood[]> {
        try {
            return await this.masterBloodService.getAllMasters()
        } catch (error) {
            return error
        }
    }


}
