import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AtendimentoService } from "../../services/atendimento/atendimento.service";
import { AuthGuard } from "../../services/auth/auth.guard";
import { Request } from "express";
import { getUserInfo } from "../../utils/getUser";
import { IcreateAtendimento } from "../../services/atendimento/ated-type";

@Controller("atendimento")
export class AtendimentoController {
    constructor(private atendimentoService: AtendimentoService) { }

    @Get()
    async getAll() {
        try {
            return await this.atendimentoService.getAtendimento()
        } catch (error) {
            throw error
        }
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    async startAtendimento(@Param('id') id: string, @Req() req: Request) {
        try {
            const { userId } = getUserInfo(req)
            await this.atendimentoService.updateMedical(id, userId)
            return { message: "success!" }
        } catch (error) {
            throw error
        }
    }

    @Post()
    @UseGuards(AuthGuard)
    async createAtendimento(@Body() data: IcreateAtendimento, @Req() req: Request) {
        try {
            const { userId } = getUserInfo(req)
            await this.atendimentoService.addMedicamentos(userId, data)
            return { message: "success" }
        } catch (error) {
            throw error
        }
    }

}