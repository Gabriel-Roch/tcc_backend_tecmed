import { Body, Controller, Get, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '../../utils/zodValidation';
import { schemaNewManufacturer } from './medicine_manufacturer.type';
import { z } from 'zod';
import { MedicineManufacturerService } from '../../services/medicine_manufacturer/medicine_manufacturer.service';
import { AuthGuard } from '../../services/auth/auth.guard';
import { Request } from 'express';
import { getUserInfo } from '../../utils/getUser';

@Controller('medicine-manufacturer')
export class MedicineManufacturerController {

    constructor(private medicine_manufacturer: MedicineManufacturerService) { }


    @Get()
    @UseGuards(AuthGuard)
    async getAllActive() {
        try {
            return await this.medicine_manufacturer.getAll()
        } catch (error) {
            throw error
        }
    }

    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new ZodValidationPipe(schemaNewManufacturer))
    async create(@Req() req: Request, @Body() data: z.infer<typeof schemaNewManufacturer>) {
        try {
            const { userId } = getUserInfo(req)
            await this.medicine_manufacturer.create({
                m_name: data.name,
                cnpj: data.cnpj,
                fk_insert_user: userId,
                status: true
            })
        } catch (error) {
            throw error
        }
    }

}
