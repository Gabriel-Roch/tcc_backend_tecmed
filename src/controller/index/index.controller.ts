import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../services/auth/auth.guard";


@Controller("/")
export class IndexController{

    @Get()
    @UseGuards(AuthGuard)
    index(){
        return "build git actions 2"
    }
}