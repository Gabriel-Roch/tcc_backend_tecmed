import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

Injectable()
export class TotemService {

    constructor(private prisma: PrismaService) { }

    private cpf: string

    public async startService(cpf: string) {
        try {
            this.cpf = cpf
        } catch (error) {
            throw error
        }
    }

}