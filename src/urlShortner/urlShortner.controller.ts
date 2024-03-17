import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUrlShortnerDto } from './dto/CreateUrlShortner.dto';
import { UrlShortnerService } from './urlShortner.service';
import { AuthGuard } from '@nestjs/passport';
import { userGuard } from 'src/user/user.guard';

@Controller('urlShortner')
export class UrlShortnerController {
  constructor(private urlShortnerService: UrlShortnerService) {}

  @UseGuards(userGuard)
  @Post('create') 
  create(@Body() {originalUrl}: CreateUrlShortnerDto, @Req() req: Request) {
    const userId = req?.['user']?._id;
    return this.urlShortnerService.createUrlShortner(
      originalUrl,
      userId,
    );
  }
}
