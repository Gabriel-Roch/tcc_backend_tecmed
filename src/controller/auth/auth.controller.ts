import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { AuthService } from "../../services/auth/auth.service";
import { IschemaAuthLoginDTO, schemAuthLoginDTO } from "./auth.type";
import { ZodValidationPipe } from "../../utils/zodValidation";

@Controller("auth")
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post("/login")
    @UsePipes(new ZodValidationPipe(schemAuthLoginDTO))
    async login(@Body() data: IschemaAuthLoginDTO) {
        try {
            return await this.authService.signIn(data.username, data.password)
        } catch (error) {
            throw error
        }
    }
}