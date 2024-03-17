import { Body, Controller, Post } from '@nestjs/common';
import { CreateUrlShortnerDto } from './dto/CreateUrlShortner.dto';
import { UrlShortnerService } from './urlShortner.service';

@Controller('urlShortner')
export class UrlShortnerController {
  constructor(private urlShortnerService: UrlShortnerService) {}
  @Post('create')
  create(@Body() createUrlShortner: CreateUrlShortnerDto) {
    return this.urlShortnerService.createUrlShortner(createUrlShortner);
  }
}
