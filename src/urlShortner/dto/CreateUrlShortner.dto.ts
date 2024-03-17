import { IsEmail, IsNotEmpty, IsString, IsUrl, Min } from 'class-validator';

export class CreateUrlShortnerDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsUrl()
  originalUrl: string;

  
}
