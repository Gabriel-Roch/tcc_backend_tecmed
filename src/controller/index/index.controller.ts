import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../services/auth/authGuard.service";


@Controller("/")
export class IndexController{

    @Get()
    @UseGuards(AuthGuard)
    index(){
        return "build git actions 2"
    }
}