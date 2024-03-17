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

const hostUrl = 'http://localhost:3000';

@Injectable()
export class UrlShortnerService {
  constructor(
    @InjectModel(UrlShortner.name)
    private urlShortnerModal: Model<UrlShortner>,
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
    createUrlShortnerDto: CreateUrlShortnerDto,
  ): Promise<string> {
    const { originalUrl, userId } = createUrlShortnerDto;

    const isUrlExist = await this.urlShortnerModal
      .findOne({ originalUrl })
      .exec();

    if (isUrlExist) {
      isUrlExist.userIds.push(userId);
      await isUrlExist.save();
      return this.generateShortUrlWithBase(isUrlExist.shortUrl);
    }
    let newOriginalUrl = originalUrl;
    if (!originalUrl.startsWith('http://') && !originalUrl.startsWith('https://')) {
      newOriginalUrl = `http://${originalUrl}`;
    }

    const urlId = await this.generateUniqueHash();
    const shortUrl = `${urlId}`;
   
    const urlShortner = new this.urlShortnerModal({
      originalUrl:newOriginalUrl,
      shortUrl,
      userIds: [userId],
    });
    const newUrlShortner = await urlShortner.save();

    return `${hostUrl}/${newUrlShortner.shortUrl}`;
  }

  async getOriginalUrl(shortUrl: string): Promise<string | null> {
    console.log(shortUrl);
    const originalUrl = (
      await this.urlShortnerModal.findOne({ shortUrl }).exec()
    ).originalUrl;
    console.log(originalUrl);
    return originalUrl;
  }
}
