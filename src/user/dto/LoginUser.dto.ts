import { IsEmail, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;
 
  @IsString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters',
  })
  password: string;

}
