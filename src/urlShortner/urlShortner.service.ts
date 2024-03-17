import { InjectRedis } from '@nestjs-modules/ioredis';
import { Inject, Injectable } from '@nestjs/common';
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
    const isUrlExist = await this.urlShortnerModal
      .findOne({ originalUrl })
      .exec();

    if (isUrlExist) {
      return this.generateShortUrlWithBase(isUrlExist.shortUrl);
    }
    let newOriginalUrl = originalUrl;
    if (
      !originalUrl.startsWith('http://') &&
      !originalUrl.startsWith('https://')
    ) {
      newOriginalUrl = `http://${originalUrl}`;
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

  async getOriginalUrl(shortUrl: string): Promise<string | null> {
    const accessedUrl = await this.urlShortnerModal
      .findOne({ shortUrl })
      .exec();
    const originalUrl = accessedUrl.originalUrl;
    const query = { urlId: accessedUrl._id };

    const update = {
      $push: { devices: 'desktop', accesses: new Date(), browsers: 'chrome' },
      $inc: { clicks: 1 },
    };

    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

      this.analyticsModal
      .findOneAndUpdate(query, update, options)
      .exec();
      return originalUrl;

  }

  async getAllUrls(userId: string): Promise<UrlShortner[]> {
    return await this.urlShortnerModal.find({ userId }).exec();
  }

  async getAnalytics(urlId: string): Promise<any> {
    return await this.analyticsModal.find();
  }
}
