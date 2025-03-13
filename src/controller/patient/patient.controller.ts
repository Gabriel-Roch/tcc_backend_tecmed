import { Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common";
import { PatientService } from "../../services/patient/patient.service";
import { newPatientDTO, schemaNewPatientsDTO } from "src/models/patient.model";
import { ZodValidationPipe } from "../../utils/zodValidation";
import { AuthGuard } from "src/services/auth/authGuard.service";

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