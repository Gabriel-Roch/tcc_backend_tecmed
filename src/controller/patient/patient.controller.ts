import { Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "../../utils/zodValidation";
import { AuthGuard } from "../../services/auth/authGuard.service";
import { newPatientDTO, schemaNewPatientsDTO } from "../../services/patient/patient.type";
import { PatientService } from "../../services/patient/patient.service";

@Controller("/patient")
export class PatientController {

    constructor(private readonly patientService: PatientService) { }

    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new ZodValidationPipe(schemaNewPatientsDTO))
    async newPatient(@Body() data: newPatientDTO) {
        try {
            await this.patientService.newPatient(data)
            return {message : "paciente cadastrado!"}
        } catch (error) {
            throw error
        }
    }

}