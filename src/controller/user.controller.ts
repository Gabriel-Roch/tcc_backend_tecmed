import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes } from "@nestjs/common";
import { InewUser, IupdateUser, schemaNewUserDTO, schemaUpdateUserDTO } from "src/models/user.model";
import { UserService } from "src/services/user.service";
import { ZodValidationPipe } from "src/utils/zodValidation";


@Controller("/users")
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    async getAll() {
        try {
            return await this.userService.getAllUsers()
        } catch (error) {
            return error
        }
    }

    @Get(':id')
    async getByID(@Param('id') id: number) {
        try {
            return await this.userService.deleteUserById(id)
        } catch (error) {
            return error
        }
    }

    @Post()
    @UsePipes(new ZodValidationPipe(schemaNewUserDTO))
    async newUser(@Body() data: InewUser) {
        try {
            await this.userService.newUser(data)
        } catch (error) {
            return error
        }
    }

    @Patch()
    @UsePipes(new ZodValidationPipe(schemaUpdateUserDTO))
    async update(@Body() data: IupdateUser) {
        try {
            await this.userService.updateUser(data)
        } catch (error) {
            return error
        }
    }

    @Delete(':id')
    async deleteById(@Param('id') id : number) {
        try {
            await this.userService.deleteUserById(id)
        } catch (error) {
            return error
        }
    }




}