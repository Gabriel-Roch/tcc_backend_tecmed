import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes } from "@nestjs/common";
import { InewUser, IupdateUser, schemaNewUserDTO, schemaUpdateUserDTO } from "src/models/user.model";
import { UserService } from "../../services/user/user.service";
import { ZodValidationPipe } from "../../utils/zodValidation";


@Controller("/users")
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    async getAll() {
        try {
            return await this.userService.getAllUsers()
        } catch (error) {
            throw error
        }
    }

    @Get(':id')
    async getByID(@Param('id') id: number) {
        try {
            return await this.userService.deleteUserById(id)
        } catch (error) {
            throw error
        }
    }

    @Post()
    @UsePipes(new ZodValidationPipe(schemaNewUserDTO))
    async newUser(@Body() data: InewUser) {
        try {
            await this.userService.newUser(data)
        } catch (error) {
            throw error
        }
    }

    @Patch()
    @UsePipes(new ZodValidationPipe(schemaUpdateUserDTO))
    async update(@Body() data: IupdateUser) {
        try {
            await this.userService.updateUser(data)
        } catch (error) {
            throw error
        }
    }

    @Delete(':id')
    async deleteById(@Param('id') id: number) {
        try {
            await this.userService.deleteUserById(id)
        } catch (error) {
            throw error
        }
    }




}