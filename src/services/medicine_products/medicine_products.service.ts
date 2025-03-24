import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IcreateProduct, IgetAll } from './medicine_product.type';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class MedicineProductService {

    constructor(private prismaService: PrismaService) { }

    async getAll() {
        try {
            return await this.prismaService.$queryRaw<Promise<IgetAll[]>>`SELECT 
            mp.id_mp,
            mp.mp_name,
            mp.category,
            mp.distribution_unit_of_measure,
            mp.quantity_per_measure,
            mp.current_stock,
            mp.reserved_stock,
            mp.min_stock_level,
            u.id_u AS id_register_user,
            u.u_name AS register_user,
            mm.m_name AS name_manufacturer
        FROM
            medicine_products mp
                LEFT JOIN
            medicine_manufacturer mm ON mp.fk_medicine_manufacturer = mm.id_mm
                LEFT JOIN
            user u ON mp.fk_insert_user = u.id_u`
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async create(data: IcreateProduct) {
        try {
            await this.prismaService.medicine_products.create({
                data: {
                    mp_name: data.mp_name,
                    category: data.category,
                    distribution_unit_of_measure: data.distribution_unit_of_measure,
                    quantity_per_measure: data.quantity_per_measure,
                    current_stock: data.current_stock,
                    reserved_stock: 0,
                    min_stock_level: data.min_stock_level,
                    fk_medicine_manufacturer: data.fk_medicine_manufacturer,
                    fk_insert_user: data.fk_insert_user,
                }
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                let er = error as PrismaClientKnownRequestError
                throw new BadRequestException(er.name)
            }
            throw new InternalServerErrorException(error)
        }
    }

}
