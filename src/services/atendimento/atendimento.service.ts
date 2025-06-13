import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { IcreateAtendimento } from "./ated-type";
import { randomUUID } from "crypto";




@Injectable()
export class AtendimentoService {
    constructor(private prismaService: PrismaService) { }

    async getAtendimento() {
        try {
            return await this.prismaService.$queryRaw`
            SELECT 
                id_service,
                fk_id_patient,
                fk_id_medical,
                _status,
                p_name,
                sex,
                cpf
            FROM
                service
                    LEFT JOIN
                patients ON fk_id_patient = id_p
                    HAVING _status = 'start';`
        } catch (error) {
            throw error
        }
    }

    async updateMedical(id_service: string, id: string) {
        try {
            return await this.prismaService.service.update({
                data: {
                    fk_id_medical: id
                },
                where: {
                    id_service: id_service
                }
            })
        } catch (error) {
            throw error
        }
    }

    async addMedicamentos(requestUser: string, params: IcreateAtendimento) {
        try {

            const { medicamentos, id_service } = params;

            const id_patient = await this.prismaService.service.findUnique({
                where:
                {
                    id_service: id_service
                }
            })

            const transaction = await this.prismaService.$transaction(async (tx) => {

                for (const med of medicamentos) {
                    console.log(med)
                    const id = med.id_mp
                    const qtd = Number(med.quantidade)
                    await tx.$queryRaw`UPDATE tecmed.medicine_products SET current_stock = (current_stock - ${qtd}) WHERE id_mp = ${id}`


                    await tx.$queryRaw`INSERT INTO tecmed.moving_products (id_mov, fk_id_product, fk_requester_id_user, fk_destination_patient, fk_service, qty, _type, _status) 
                                       VALUES (${randomUUID()}, ${id}, ${requestUser}, ${id_patient?.fk_id_patient}, ${params.id_service}, ${qtd}, 'output', 'success') `

                }
            });

            return transaction;
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}