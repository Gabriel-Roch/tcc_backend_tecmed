import { Controller, Get } from "@nestjs/common";


@Controller("/")
export class IndexController{

    @Get()
    index(){
        return process.env.NAME_SYSTEM
    }
}