import { z } from "zod"

export const schemAuthLoginDTO = z.object({
    username: z.string(),
    password: z.string()
})

export type IschemaAuthLoginDTO = z.infer<typeof schemAuthLoginDTO>