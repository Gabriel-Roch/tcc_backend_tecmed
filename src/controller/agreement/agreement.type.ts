import { z } from "zod";

export const createAgreementDTO = z.object({
    ma_name: z.string(),
    cnpj: z.string(),
    contact: z.string(),
    remark: z.string()
})