import { BadRequestException, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';
import { userGuard } from './user.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  
  @Post('/signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return  this.userService.createUser(createUserDto);
    }
    catch{
      throw new BadRequestException();
    }
   
  }

  @Post('/signin')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
  }
}
