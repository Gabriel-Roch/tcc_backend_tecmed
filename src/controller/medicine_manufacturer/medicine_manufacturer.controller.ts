import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '../../utils/zodValidation';
import { schemaNewManufacturer } from './medicine_manufacturer.type';
import { z } from 'zod';
import { MedicineManufacturerService } from '../../services/medicine_manufacturer/medicine_manufacturer.service';

@Controller('medicine-manufacturer')
export class MedicineManufacturerController {

    constructor(private medicine_manufacturer: MedicineManufacturerService) { }

    @Post()
    @UsePipes(new ZodValidationPipe(schemaNewManufacturer))
    async create(@Body() data: z.infer<typeof schemaNewManufacturer>) {
        try {
            await this.medicine_manufacturer.create({
                m_name: data.name,
                cnpj: data.cnpj,
                fk_insert_user: 1
            })
        } catch (error) {
            throw error
        }
    }

}
