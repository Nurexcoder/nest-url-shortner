import { Controller, Get, Param, Redirect, Res, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UrlShortner } from './schemas/UrlShortner.schema';
import { Model } from 'mongoose';
import { AppProvider } from './app.provider';
import { UrlShortnerService } from './urlShortner/urlShortner.service';
import { userGuard } from './user/user.guard';

@Controller('')
export class AppController {
  constructor(private appProvider: AppProvider) {}

  @Get('/:shortUrl')
  async getOriginalSite(
    @Param('shortUrl') shortUrl,
    @Res() res,
  ): Promise<string> {
    const originalUrl = await this.appProvider.getOriginalUrl(shortUrl);
    
    return res.redirect(originalUrl);
  }
}
