import { IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlShortnerDto {
  @ApiProperty({
    example: 'https://example.com/page1',
    description: 'Original URL',
  })
  @IsUrl()
  originalUrl: string;
}
