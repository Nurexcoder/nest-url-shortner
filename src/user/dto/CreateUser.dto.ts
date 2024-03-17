import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;


  @IsString()
  // @Min(3, {
  //   message: 'Password must be at least 6 characters',

  // })
  password: string;
  
  @IsEmail()
  email: string;

  
  avatarUrl?: string;
}
