import { Body, Controller, Post, Req, UseGuards, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "../../utils/zodValidation";
import { AuthGuard } from "../../services/auth/auth.guard";
import { PatientService } from "../../services/patient/patient.service";
import { Request } from "express";
import { schemaNewPatientsDTO } from "./patient.type";
import { z } from "zod";
import { getUserInfo } from "../../utils/getUser";

@Controller("/patient")
export class PatientController {

    constructor(private readonly patientService: PatientService) { }

    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new ZodValidationPipe(schemaNewPatientsDTO))
    async newPatient(@Req() req: Request, @Body() data: z.infer<typeof schemaNewPatientsDTO>) {
        try {
            const { userId } = getUserInfo(req)
            await this.patientService.newPatient(Object.assign(data, {
                id_insert_user: userId
            }))
            return { message: "paciente cadastrado!" }
        } catch (error) {
            throw error
        }
    }

}