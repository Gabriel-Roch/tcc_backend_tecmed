import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { IschemaAuthLoginDTO, schemAuthLoginDTO } from "src/models/auth.model";
import { AuthService } from "src/services/auth/auth.service";
import { ZodValidationPipe } from "src/utils/zodValidation";


@Controller("auth")
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post("/login")
    @UsePipes(new ZodValidationPipe(schemAuthLoginDTO))
    async login(@Body() data: IschemaAuthLoginDTO) {
        try {
            const token = await this.authService.signIn(data.username, data.password)
            return token
        } catch (error) {
            throw error
        }
    }
}