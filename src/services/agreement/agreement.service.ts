import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { medical_agreement } from "@prisma/client";
import { ICreateAgreemnet } from "./agreement.type";

@Injectable()
export class AgreementService {

    constructor(private prisma: PrismaService) { }

    async getAll(): Promise<medical_agreement[]> {
        try {
            return await this.prisma.medical_agreement.findMany()
        } catch (error) {
            throw new InternalServerErrorException("GET ALL agreement")
        }
    }

    async create(data: ICreateAgreemnet) {
        try {

            const lastMedicalAgreement = await this.prisma.medical_agreement.findFirst({
                orderBy: {
                    id_ma: 'desc',
                },
                select: {
                    id_ma: true,
                },
            });

            const nextId = lastMedicalAgreement ? lastMedicalAgreement.id_ma + 1 : 1;

            return await this.prisma.medical_agreement.create({
                data: {
                    id_ma: nextId,
                    ma_name: data.ma_name,
                    cnpj: data.cnpj,
                    contact: data.contact,
                    remark: data.remark,
                    fk_insert_user: data.fk_insert_user,
                }
            })
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

}