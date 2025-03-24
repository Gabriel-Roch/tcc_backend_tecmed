import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { newManufacturerDTO } from './medicine_manufacturer.type';

@Injectable()
export class MedicineManufacturerService {

    constructor(private prisma: PrismaService) { }

    async create(data: newManufacturerDTO) {
        try {
            await this.prisma.medicine_manufacturer.create({
                data: {
                    m_name: data.m_name,
                    cnpj: data.cnpj,
                    fk_insert_user: data.fk_insert_user
                }
            })
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async getAll() {
        try {
            return await this.prisma.medicine_manufacturer.findMany({
                select: {
                    id_mm: true,
                    m_name: true
                },
                where: {
                    status: true
                }
            })
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

}
