import { UnauthorizedException } from '@nestjs/common'
import { Injectable } from "@nestjs/common/decorators";
import { UserService } from "src/services/user/user.service";
import { user } from "@prisma/client";
import { comparePassword } from "src/utils/passwordCrypto";

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) { }

    async validate(usernamee: string, password: string): Promise<Pick<user, "id_u" | "u_name">> {

        if (usernamee === undefined) {
            throw new UnauthorizedException();
        }

        const user = await this.userService.findOne(usernamee)

        if (user === null) {
            throw new UnauthorizedException()
        }

        if (comparePassword(password, user.password)) {
            return {
                id_u: user.id_u,
                u_name: user.u_name
            }
        } else {
            throw new UnauthorizedException();
        }
    }

}