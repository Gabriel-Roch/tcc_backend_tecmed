import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { master_blood } from "@prisma/client";


@Injectable()
export class MasterBloodService {

    constructor(private prisma: PrismaService) { }
    
    async getAll(): Promise<master_blood[]> {
        try {
            return await this.prisma.master_blood.findMany({
                where: {
                    b_active: true
                }
            })
        } catch (error) {
            throw new HttpException("GET BLOOD", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}