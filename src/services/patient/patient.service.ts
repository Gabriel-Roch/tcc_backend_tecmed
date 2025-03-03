import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { newPatientDTO } from "src/models/patient.model";
import { randomUUID } from "node:crypto";
import { message } from "src/utils/messages";

@Injectable()
export class PatientService {
    constructor(private prisma: PrismaService) { }

    async newPatient(data: newPatientDTO) {
        try {

            const patient = await this.prisma.patients.count({
                where: {
                    cpf: data.cpf
                }
            })

            if (patient) {
                throw new HttpException(message.patient.error.cpf_already_used, HttpStatus.BAD_REQUEST)
            }

            const UUID = randomUUID()
            await this.prisma.$transaction([

                this.prisma.patients.create({
                    data: {
                        id_p: UUID,
                        p_name: data.name,
                        email: data.email,
                        cpf: data.cpf,
                        fk_medical_agreement: data.medical_agreement,
                        fk_type_blood: data.type_blood,
                        rg: data.rg,
                        sex: data.sex,
                        medical_agreement_number: data.medical_agreement_number,
                        fk_insert_user: 1
                    }
                }),

                this.prisma.patients_telephone.createMany({
                    data: data.telephones.map((phone) => {
                        return {
                            fk_id_p: UUID,
                            tell: phone.tell.toLocaleString(),
                            description: phone.description
                        }
                    })
                }),

                this.prisma.patients_address.create({
                    data: {
                        fk_id_pa: UUID,
                        city: data.address.city,
                        complement: data.address.complement,
                        neighborhood: data.address.neighborhood,
                        region: data.address.region,
                        state: data.address.state,
                        street: data.address.street,
                        description: data.address.description,
                        state_abbr: data.address.state_abbr,
                        zip_code: data.address.zip_code,
                        unit: data.address.unit
                    }
                })
            ])

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(message.patient.error.when_registering_patient, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}