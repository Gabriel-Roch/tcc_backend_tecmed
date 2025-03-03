import { z } from "zod"

export const schemaNewUserDTO = z.object({
    name: z.string(),
    username : z.string(),
    cpf: z.string(),
    password: z.string()
})

export const schemaUpdateUserDTO = schemaNewUserDTO.extend({
    id: z.number()
})

export type InewUser = z.infer<typeof schemaNewUserDTO>

export type IupdateUser = z.infer<typeof schemaUpdateUserDTO>






