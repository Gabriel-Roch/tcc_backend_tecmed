import { Body, Controller, Get, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { MedicineProductService } from '../../services/medicine_products/medicine_products.service';
import { AuthGuard } from '../../services/auth/auth.guard';
import { Request } from 'express';
import { getUserInfo } from '../../utils/getUser';
import { ZodValidationPipe } from '../../utils/zodValidation';
import { newProductDTO } from './medicine-product.type';
import { z } from 'zod';

@Controller('medicine-product')
export class MedicineProductController {

    constructor(private readonly medicineProductService: MedicineProductService) { }

    @Get()
    @UseGuards(AuthGuard)
    async getAll() {
        try {
            return await this.medicineProductService.getAll()
        } catch (error) {
            throw error
        }
    }

    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new ZodValidationPipe(newProductDTO))
    async create(@Req() req: Request, @Body() data: z.infer<typeof newProductDTO>) {
        try {
            const { userId } = getUserInfo(req)
            await this.medicineProductService.create(Object.assign(data, {
                fk_insert_user: userId
            }))
        } catch (error) {
            throw error
        }
    }


}
