import { Controller, Get, Param, Redirect, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UrlShortner } from './schemas/UrlShortner.schema';
import { Model } from 'mongoose';
import { AppProvider } from './app.provider';
import { UrlShortnerService } from './urlShortner/urlShortner.service';

@Controller('')
export class AppController {
  constructor(private appProvider: AppProvider) {}

  @Get('/:shortUrl')
  @Redirect('/',301)
  async getOriginalSite(
    @Param('shortUrl') shortUrl,
    @Res() res,
  ): Promise<string> {
    const originalUrl = await this.appProvider.getOriginalUrl(shortUrl);
    
    return res.redirect(originalUrl);
  }
}
