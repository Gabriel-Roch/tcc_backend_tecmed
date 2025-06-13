import { Body, Controller, Get, Post } from "@nestjs/common";
import { TotemService } from "../../services/totem/totem.service";

@Controller("totem")
export class TotemController {

    constructor(private totemService: TotemService) { }

    @Post()
    async checkin(@Body() data: { cpf: string }) {
        try {
            await this.totemService.startService(data.cpf)
            await this.totemService.getUUID()
            await this.totemService.check_if_exists_checkin()
            await this.totemService.create_service()
            return { message: "success" }
        } catch (error) {
            throw error
        }
    }


}