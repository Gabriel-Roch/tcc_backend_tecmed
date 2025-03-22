import { Controller, Get, UseGuards } from '@nestjs/common';
import { MasterBloodService } from '../../services/masterBlood/masterBlood.service';
import { AuthGuard } from '../../services/auth/auth.guard';

@Controller("/master/blood")
export class BloodController {

    constructor(private readonly masterBloodService: MasterBloodService) { }

    @Get()
    @UseGuards(AuthGuard)
    async getAll() {
        try {
            return await this.masterBloodService.getAll()
        } catch (error) {
            throw error
        }
    }


}
