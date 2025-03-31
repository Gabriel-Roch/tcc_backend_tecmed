export interface InewPatient {
    id_insert_user : string
    name: string,
    email: string,
    sex: "M" | "F",
    cpf: string,
    rg: string,
    birth: string,
    type_blood?: number | null
    medical_agreement: number | null
    medical_agreement_number: string | null
    telephones: Array<{
        tell: string | number,
        description: string
    }>,
    address: {
        zip_code: string
        street: string
        complement?: string | null
        unit: string
        neighborhood: string
        city: string
        state_abbr: string
        state: string
        region: string
        description: string
    }
}

