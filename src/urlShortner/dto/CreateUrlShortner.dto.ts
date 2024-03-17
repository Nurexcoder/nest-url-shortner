import { IsEmail, IsNotEmpty, IsString, IsUrl, Min } from 'class-validator';

export class CreateUrlShortnerDto {
 

  @IsUrl()
  originalUrl: string;

  
}
