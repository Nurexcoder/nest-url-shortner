import {
  Controller,
  Get,
  Param,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UrlShortner } from './schemas/UrlShortner.schema';
import { Model } from 'mongoose';
import { AppProvider } from './app.provider';
import { UrlShortnerService } from './urlShortner/urlShortner.service';
import { userGuard } from './user/user.guard';
import { DeviceInfoService } from './middleware/accessInfo.middleware';
import { DeviceInfo } from './lib/types';

@Controller('')
export class AppController {
  constructor(
    private appProvider: AppProvider,
    private readonly deviceInfoService: DeviceInfoService,
  ) {}

  @Get('/:shortUrl')
  async getOriginalSite(
    @Param('shortUrl') shortUrl,
    @Res() res,
    @Req() req,
  ): Promise<string> {
    const userAgent = req.headers['user-agent'];
    console.log(userAgent);
    const deviceInfo = this.deviceInfoService.getDeviceInformation(userAgent);
    console.log(deviceInfo);
    const structuredDeviceInfo:DeviceInfo = {
      os: deviceInfo.os.name,
      browser: deviceInfo.client.name,
      device:deviceInfo.device.type
    };
    const originalUrl = await this.appProvider.getOriginalUrl(shortUrl,structuredDeviceInfo);

    return res.redirect(originalUrl);
  }
}
