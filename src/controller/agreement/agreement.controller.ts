import { Body, Controller, Get, Post, Req, UseGuards, UsePipes } from "@nestjs/common";
import { AgreementService } from "../../services/agreement/agreement.service";
import { AuthGuard } from "../../services/auth/auth.guard";
import { ZodValidationPipe } from "../../utils/zodValidation";
import { createAgreementDTO } from "./agreement.type";
import { z } from "zod";
import { getUserInfo } from "../../utils/getUser";
import { Request } from "express";

@Controller("/master/agreement")
export class AgreementController {

    constructor(private readonly agreementService: AgreementService) { }

    @Get()
    @UseGuards(AuthGuard)
    async getAll() {
        try {
            return await this.agreementService.getAll()
        } catch (error) {
            throw error
        }
    }


    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new ZodValidationPipe(createAgreementDTO))
    async create(@Req() req: Request, @Body() data: z.infer<typeof createAgreementDTO>) {
        try {
            const { userId } = getUserInfo(req)
            await this.agreementService.create(Object.assign(data, { fk_insert_user: userId }))
            return { message: "success!" }
        } catch (error) {
            throw error
        }
    }

}