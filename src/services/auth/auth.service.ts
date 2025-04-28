import { HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common'
import { Injectable } from "@nestjs/common/decorators";
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { comparePassword } from '../../utils/passwordCrypto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(username: string, password: string): Promise<{ access_token: string }> {
        try {
            if (username === undefined) {
                throw new UnauthorizedException();
            }

            const user = await this.userService.findOne(username)

            if (user === null) {
                throw new UnauthorizedException()
            }

            if (comparePassword(password, user.password) == false) {
                throw new UnauthorizedException();
            }

            const payload = {
                sub: user.id_u,
                name: user.u_name,
                rule: user.rule
            };

            return {
                access_token: await this.jwtService.signAsync(payload),
            };

        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error
            }
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

}