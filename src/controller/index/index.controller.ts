import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/services/auth/authGuard.service";


@Controller("/")
export class IndexController{

    @Get()
    @UseGuards(AuthGuard)
    index(){
        return "build git actions 2"
    }
}