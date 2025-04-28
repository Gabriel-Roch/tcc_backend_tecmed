import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { user } from "@prisma/client";
import { InewUser, IupdateUser } from "./user.type";
import { generateHashMd5 } from "../../utils/passwordCrypto";
import { PrismaService } from "../prisma/prisma.service";


@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) { }

    async getAllUsers(): Promise<user[]> {
        try {
            return await this.prisma.user.findMany()
        } catch (error) {
            throw new InternalServerErrorException("GET BLOOD")
        }
    }

    async newUser(data: InewUser): Promise<void> {
        try {
            let existingUser = await this.prisma.user.count({
                where: {
                    cpf: data.cpf
                }
            })

            if (existingUser) {
                throw new BadRequestException("Cpf Ja utilizado")
            }

            await this.prisma.user.create({
                data: {
                    username: data.username,
                    u_name: data.name,
                    cpf: data.cpf,
                    password: generateHashMd5(data.password),
                    rule: "user"
                }
            })
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }
            throw new InternalServerErrorException("error new user")
        }
    }

    async deleteUserById(idUser: string): Promise<void> {
        try {

            const user = await this.prisma.user.count({
                where: {
                    id_u: idUser
                }
            })

            if (user === 0) {
                throw new BadRequestException("Usuario não encontrado")
            }

            await this.prisma.user.deleteMany({
                where: {
                    id_u: idUser
                }
            })
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }
            throw new InternalServerErrorException("error delete user")
        }
    }

    async updateUser(data: IupdateUser): Promise<void> {
        try {

            const user = await this.prisma.user.count({
                where: {
                    id_u: data.id
                }
            })

            if (user === 0) {
                throw new BadRequestException("user Not found")
            }

            await this.prisma.user.update({
                data: {
                    u_name: data.name,
                    cpf: data.cpf
                },
                where: {
                    id_u: data.id
                }
            })
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }
            throw new InternalServerErrorException("error update user")
        }
    }

    async getUserById(idUser: string): Promise<user> {
        try {
            const user = await this.prisma.user.findMany({
                where: {
                    id_u: idUser
                }
            })
            return user[0]
        } catch (error) {
            throw new InternalServerErrorException("getr user by id")
        }
    }

    async findOne(username: string): Promise<user | null> {
        try {
            return await this.prisma.user.findUnique({
                where: {
                    username: username
                }
            });
        } catch (error) {
            throw new InternalServerErrorException(`Error finding user: ${error.message}`);
        }
    }


}