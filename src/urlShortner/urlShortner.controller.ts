import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUrlShortnerDto } from './dto/CreateUrlShortner.dto';
import { UrlShortnerService } from './urlShortner.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('urlShortner')
export class UrlShortnerController {
  constructor(private urlShortnerService: UrlShortnerService) {}


   @Post('create')
  create(@Body() createUrlShortner: CreateUrlShortnerDto) {
    return this.urlShortnerService.createUrlShortner(createUrlShortner);
  }
}
