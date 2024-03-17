import { IsEmail, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;


  @IsString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters',

  })
  password: string;
  
  @IsEmail()
  email: string;

  
  avatarUrl?: string;
}
