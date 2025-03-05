import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UsePipes } from "@nestjs/common";
import { InewUser, IupdateUser, schemaNewUserDTO, schemaUpdateUserDTO } from "src/models/user.model";
import { UserService } from "../../services/user/user.service";
import { ZodValidationPipe } from "../../utils/zodValidation";
import { AuthGuard } from "src/services/auth/authGuard.service";
import { Request } from "express";

@Controller("/users")
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    @UseGuards(AuthGuard)
    async getAll(@Req() req : Request) {
        try {
            const user = req['user']
            console.log(user)
            return await this.userService.getAllUsers()
        } catch (error) {
            throw error
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getByID(@Param('id') id: number) {
        try {
            return await this.userService.deleteUserById(id)
        } catch (error) {
            throw error
        }
    }

    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new ZodValidationPipe(schemaNewUserDTO))
    async newUser(@Body() data: InewUser) {
        try {
            await this.userService.newUser(data)
        } catch (error) {
            throw error
        }
    }

    @Patch()
    @UseGuards(AuthGuard)
    @UsePipes(new ZodValidationPipe(schemaUpdateUserDTO))
    async update(@Body() data: IupdateUser) {
        try {
            await this.userService.updateUser(data)
        } catch (error) {
            throw error
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteById(@Param('id') id: number) {
        try {
            await this.userService.deleteUserById(id)
        } catch (error) {
            throw error
        }
    }




}