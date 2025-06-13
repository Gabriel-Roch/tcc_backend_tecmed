import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { randomUUID } from "crypto";

@Injectable()
export class TotemService {

    constructor(private prisma: PrismaService) { }

    private cpf: string
    private uuid: string

    async startService(cpf: string) {
        try {
            this.cpf = cpf
        } catch (error) {
            throw error
        }
    }

    async getUUID() {
        try {
            const uuid = await this.prisma.patients.findUnique({
                where: {
                    cpf: this.cpf
                }
            })
            if (!uuid) {
                throw new BadRequestException("CPF não encontrado!")
            }
            this.uuid = uuid?.id_p
        } catch (error) {
            throw error
        }
    }

    async check_if_exists_checkin() {
        try {

            const checkin = await this.prisma.service.findMany({
                where: {
                    fk_id_patient: this.uuid,
                    AND: {
                        OR: [
                            { status: "start" },
                            { status: "progress" }
                        ],
                    }
                }
            })

            if (checkin.length) {
                throw new BadRequestException("voce possui um checkin em aberto")
            }

        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }
            throw new InternalServerErrorException(error)
        }
    }

    async create_service() {
        try {
            await this.prisma.service.create({
                data: {
                    id_service: randomUUID(),
                    fk_id_patient: this.uuid,
                    status: "start"
                }
            })
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }
            throw new InternalServerErrorException(error)
        }
    }

}