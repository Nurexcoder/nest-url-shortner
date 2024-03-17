import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlShortner, urlShortnerSchema } from 'src/schemas/UrlShortner.schema';
import { UrlShortnerController } from './urlShortner.controller';
import { UrlShortnerService } from './urlShortner.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UrlShortner.name, schema:urlShortnerSchema  }]),
  ],
  controllers: [
    UrlShortnerController
  ],
  providers: [
    UrlShortnerService
  ],
  exports: [
    UrlShortnerService
  ],
})
export class UrlShortnerModule {}
