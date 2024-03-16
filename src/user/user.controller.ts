import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/CreateUser.dto";

@Controller('users')
export class UserController {
    constructor (private userService: UserService) {
        
    }
    @Post('/signup')
    createUser(@Body() createUserDto: CreateUserDto)
    {
        console.log(createUserDto)
        return this.userService.createUser(createUserDto)
    }

    @Post('/login')
    login(@Body() createUserDto: CreateUserDto)
    {
        return this.userService.validateUser(createUserDto.email, createUserDto.password)
    }
}