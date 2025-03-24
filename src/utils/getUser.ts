import { InternalServerErrorException } from "@nestjs/common";
import { Request } from "express";

export const getUserInfo = (req: Request) => {
    try {
        const userId = req['user'].sub as string
            
        if (!userId) {
            throw new InternalServerErrorException()
        }

        return {
            userId
        }
        
    } catch (error) {
        throw new InternalServerErrorException(error)
    }

}