import { Controller, Get, UseGuards } from '@nestjs/common';
import { master_blood } from '@prisma/client';
import { MasterBloodService } from '../../services/masterBlood/masterBlood.service';
import { AuthGuard } from '../../services/auth/authGuard.service';

@Controller("/master/blood")
export class BloodController {

    constructor(private readonly masterBloodService: MasterBloodService) { }

    @Get()
    @UseGuards(AuthGuard)
    async getAll(): Promise<master_blood[]> {
        try {
            return await this.masterBloodService.getAll()
        } catch (error) {
            throw error
        }
    }


}
