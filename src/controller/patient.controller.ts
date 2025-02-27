import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { PatientService } from "../services/patient.service";
import { newPatientDTO, schemaNewPatientsDTO } from "src/models/patient.model";
import { ZodValidationPipe } from "src/utils/zodValidation";

@Controller("/patient")
export class PatientController {

    constructor(private readonly patientService: PatientService) { }

    @Post()
    @UsePipes(new ZodValidationPipe(schemaNewPatientsDTO))
    async newPatient(@Body() data: newPatientDTO) {
        await this.patientService.newPatient(data)
    }

}