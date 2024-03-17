import { InjectRedis } from '@nestjs-modules/ioredis';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Redis } from 'ioredis';
import { Model } from 'mongoose';
import { UrlShortner, urlShortnerSchema } from 'src/schemas/UrlShortner.schema';
import * as base62 from 'base62';
import { nanoid } from 'nanoid';
import ShortUniqueId from 'short-unique-id';
import { CreateUrlShortnerDto } from './dto/CreateUrlShortner.dto';
import { Analytics } from 'src/schemas/Analytics.schema';
import { AnalyticsDto } from './dto/Analytics.dto';
import { DeviceInfoService } from 'src/middleware/accessInfo.middleware';
import { DeviceInfo, InfoCount } from 'src/lib/types';
import { convertArrayToRecord, getActiveHoursAndDates } from 'src/lib/utils';

const hostUrl = 'http://localhost:3000';

@Injectable()
export class UrlShortnerService {
  constructor(
    @InjectModel(UrlShortner.name)
    private urlShortnerModal: Model<UrlShortner>,
    @InjectModel(Analytics.name) private analyticsModal: Model<Analytics>,
  ) {}

  generateShortUrlWithBase(shortUrl: string) {
    return `${hostUrl}/${shortUrl}`;
  }

  async generateUniqueHash(): Promise<string> {
    const urlId = nanoid(7);

    return urlId;
  }

  async findOneByHash(urlId: string): Promise<UrlShortner | null> {
    return this.urlShortnerModal.findOne({ urlId }).exec();
  }

  async createUrlShortner(
    originalUrl: string,
    userId: string,
  ): Promise<string> {
    let newOriginalUrl = originalUrl;
    if (
      !originalUrl.startsWith('http://') &&
      !originalUrl.startsWith('https://')
    ) {
      newOriginalUrl = `http://${originalUrl}`;
    }
    const isUrlExist = await this.urlShortnerModal
      .findOne({ originalUrl: newOriginalUrl, userId })
      .exec();

    if (isUrlExist) {
      return this.generateShortUrlWithBase(isUrlExist.shortUrl);
    }

    const urlId = await this.generateUniqueHash();
    const shortUrl = `${urlId}`;

    const urlShortner = new this.urlShortnerModal({
      originalUrl: newOriginalUrl,
      shortUrl,
      userId: userId,
    });
    const newUrlShortner = await urlShortner.save();

    return `${hostUrl}/${newUrlShortner.shortUrl}`;
  }

  async getOriginalUrl(
    shortUrl: string,
    deviceInfo: DeviceInfo,
  ): Promise<string | null> {
    const accessedUrl = await this.urlShortnerModal
      .findOne({ shortUrl })
      .exec();

    if (!accessedUrl) {
      throw new NotFoundException('Not a valid url');
    }
    const originalUrl = accessedUrl.originalUrl;

    const query = { urlId: accessedUrl._id };

    const update = {
      $push: {
        devices: deviceInfo.device,
        accesses: new Date(),
        browsers: deviceInfo.browser,
        os: deviceInfo.os,
      },
      $inc: { clicks: 1 },
    };

    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    this.analyticsModal.findOneAndUpdate(query, update, options).exec();
    return originalUrl;
  }

  async getAllUrls(userId: string): Promise<UrlShortner[]> {
    return await this.urlShortnerModal.find({ userId }).exec();
  }

  async getAllAnalytics(userId: string): Promise<any> {
    return this.analyticsModal.find({ userId });
  }


  async getAnalytics(urlId: string): Promise<any> {
    const urlObj = await this.urlShortnerModal.findById(urlId);
    if (!urlObj) {
      throw new NotFoundException('Not a valid ID');
    }
    const analytics = await this.analyticsModal.findOne({ urlId:urlObj._id });
    if (!analytics) {
      return 'No analytics available';
    }
    const analyticsDto = new AnalyticsDto();
    analyticsDto.urlId = urlObj._id;
    analyticsDto.originalUrl=urlObj.originalUrl
    analyticsDto.shortUrl=this.generateShortUrlWithBase(urlObj.shortUrl)
    analyticsDto.clicks = analytics.clicks;
    analyticsDto.devices = convertArrayToRecord(analytics.devices);
    analyticsDto.browsers = convertArrayToRecord(analytics.browsers);
    analyticsDto.os = convertArrayToRecord(analytics.os);
    const { activeDates, activeHours } = getActiveHoursAndDates(
      analytics.accesses,
    );
    analyticsDto.activeHours = activeHours;
    analyticsDto.dates = activeDates;
    analyticsDto.clicks = analytics.clicks;
    return analyticsDto;
  }
}
