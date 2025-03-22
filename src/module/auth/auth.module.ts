import { Module } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { PrismaService } from '../../services/prisma/prisma.service';
import { AuthController } from '../../controller/auth/auth.controller';
import { AuthService } from '../../services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../../services/auth/auth.guard';

@Module({
    imports: [
        JwtModule.register({
            global : true,
            secret: process.env.JWT_TOKEN,
            signOptions: { expiresIn: '10h' }, 
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthGuard,
        AuthService,
        UserService,
        PrismaService
    ]
})
export class AuthModule { }
