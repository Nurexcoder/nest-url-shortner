import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { InfoCount } from 'src/lib/types';

export class AnalyticsDto {
  @ApiProperty({ example: '123456', description: 'URL ID' })
  @IsString()
  urlId: string;

  @ApiProperty({
    example: 'https://example.com/original',
    description: 'Original URL',
  })
  originalUrl: string;

  @ApiProperty({
    example: 'https://short.url/abcd123',
    description: 'Short URL',
  })
  shortUrl: string;

  @ApiProperty({ example: 10, description: 'Number of clicks' })
  clicks: number;

  @ApiProperty({
    example: { desktop: 5, mobile: 3 },
    description: 'Devices count',
  })
  devices: InfoCount;

  @ApiProperty({
    example: { Windows: 7, macOS: 3 },
    description: 'Operating systems count',
  })
  os: InfoCount;

  @ApiProperty({
    example: { Chrome: 5, Firefox: 3 },
    description: 'Browsers count',
  })
  browsers: InfoCount;

  @ApiProperty({
    example: { '12:00': 5, '13:00': 3 },
    description: 'Active hours count',
  })
  activeHours: InfoCount;

  @ApiProperty({
    example: { '2024-03-25': 5, '2024-03-26': 3 },
    description: 'Dates count',
  })
  dates: InfoCount;
}
