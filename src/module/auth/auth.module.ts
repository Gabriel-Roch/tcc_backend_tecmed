import { Module } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
    imports: [],
    controllers: [],
    providers: [
        UserService,
        PrismaService
    ]
})
export class AuthModule { }
