import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Min(6, {
    message: 'Password must be at least 6 characters',
  })
  password: string;

}
