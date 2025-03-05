import { HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common'
import { Injectable } from "@nestjs/common/decorators";
import { UserService } from "src/services/user/user.service";
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from "src/utils/passwordCrypto";

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(usernamee: string, password: string): Promise<{ access_token: string }> {
        try {
            if (usernamee === undefined) {
                throw new UnauthorizedException();
            }

            const user = await this.userService.findOne(usernamee)

            if (user === null) {
                throw new UnauthorizedException()
            }

            if (comparePassword(password, user.password) == false) {
                throw new UnauthorizedException();
            }

            const payload = { sub: user.id_u, username: user.username };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };

        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error
            }
            throw new HttpException("error Login", HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

}