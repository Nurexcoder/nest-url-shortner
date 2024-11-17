import { Injectable } from '@nestjs/common';

import { UrlShortnerService } from './urlShortner/urlShortner.service';
import { DeviceInfo } from './lib/types';

@Injectable()
export class AppProvider {
  constructor(private urlShortnerService: UrlShortnerService) {}

  async getOriginalUrl(
    shortUrl: string,
    structuredDeviceInfo: DeviceInfo,
  ): Promise<string | null> {
    // return (await this.urlShortnerModal.findOne({ shortUrl }).exec()).originalUrl;
    return await this.urlShortnerService.getOriginalUrl(
      shortUrl,
      structuredDeviceInfo,
    );
  }
}
