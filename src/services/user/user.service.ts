import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
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
            throw new HttpException("GET BLOOD", HttpStatus.INTERNAL_SERVER_ERROR)
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
                    password: generateHashMd5(data.password)
                }
            })
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }
            throw new HttpException("error new user", HttpStatus.INTERNAL_SERVER_ERROR)
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
                throw new HttpException("Usuario não encontrado", HttpStatus.BAD_REQUEST)
            }

            await this.prisma.user.deleteMany({
                where: {
                    id_u: idUser
                }
            })
        } catch (error) {
            throw new HttpException("error delete user", HttpStatus.INTERNAL_SERVER_ERROR)
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
                throw new HttpException("GET BLOOD", HttpStatus.INTERNAL_SERVER_ERROR)
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
            throw new HttpException("error update user", HttpStatus.INTERNAL_SERVER_ERROR)
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
            throw new HttpException("getr user by id", HttpStatus.INTERNAL_SERVER_ERROR)
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
            throw new HttpException(`Error finding user: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}