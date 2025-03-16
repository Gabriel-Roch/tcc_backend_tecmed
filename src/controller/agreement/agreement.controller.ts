import { Controller, Get } from "@nestjs/common";
import { AgreementService } from "../../services/agreement/agreement.service";

@Controller("/master/agreement")
export class AgreementController {

    constructor(private readonly agreementService: AgreementService) { }

    @Get()
    async getAll() {
        try {
            return await this.agreementService.getAll()
        } catch (error) {
            throw error
        }
    }

}