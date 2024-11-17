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

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('')
@Controller('')
export class AppController {
  constructor(
    private appProvider: AppProvider,
    private readonly deviceInfoService: DeviceInfoService,
  ) {}

  @Get(':shortUrl')
  @ApiOperation({ summary: 'Get original url' })
  @ApiResponse({ status: 301, description: 'Redirect to Orginal Url' })
  @ApiResponse({ status: 404, description: 'Url not found' })
  @Get('/:shortUrl')
  async getOriginalSite(
    @Param('shortUrl') shortUrl: string,
    @Res() res,
    @Req() req,
  ): Promise<string> {
    const userAgent = req.headers['user-agent'];
    const deviceInfo = this.deviceInfoService.getDeviceInformation(userAgent);
    const structuredDeviceInfo: DeviceInfo = {
      os: deviceInfo.os.name,
      browser: deviceInfo.client.name,
      device: deviceInfo.device.type,
    };
    const originalUrl = await this.appProvider.getOriginalUrl(
      shortUrl,
      structuredDeviceInfo,
    );

    return res.redirect(originalUrl);
  }
}
