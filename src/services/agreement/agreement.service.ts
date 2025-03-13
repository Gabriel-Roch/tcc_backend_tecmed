import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { medical_agreement } from "@prisma/client";


@Injectable()
export class AgreementService {

    constructor(private prisma: PrismaService) { }

    async getAll(): Promise<medical_agreement[]> {
        try {
            return await this.prisma.medical_agreement.findMany()
        } catch (error) {
            throw new HttpException("GET ALL agreement", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}