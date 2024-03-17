import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.createUser(createUserDto);
    } catch (error) {
      return BadRequestException
    }
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
  }
}
