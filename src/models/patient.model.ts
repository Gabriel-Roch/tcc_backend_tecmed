import { patients_sex } from "@prisma/client"
import { z } from "zod"

export const schemaNewPatientsDTO = z.object({
    name: z.string(),
    email: z.string().email(),
    sex: z.nativeEnum(patients_sex),
    cpf: z.string(),
    rg: z.string(),
    birth : z.string(),
    type_blood: z.number().or(z.null()),
    medical_agreement: z.number().or(z.null()),
    medical_agreement_number: z.string().or(z.null()),
    telephones: z.array(
        z.object({
            tell: z.string().or(z.number()),
            description: z.string()
        })
    ),
    address: z.object({
        zip_code: z.string(),
        street: z.string(),
        complement: z.string(),
        unit: z.string(),
        neighborhood: z.string(),
        city: z.string(),
        state_abbr: z.string(),
        state: z.string(),
        region: z.string(),
        description: z.string()
    })
})

export type newPatientDTO = z.infer<typeof schemaNewPatientsDTO>