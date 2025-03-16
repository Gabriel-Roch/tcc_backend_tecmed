import { z } from "zod";

export const schemaNewManufacturer = z.object({
    name: z.string(),
    cnpj: z.string().or(z.null())
})