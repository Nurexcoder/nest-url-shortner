import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlShortner, urlShortnerSchema } from 'src/schemas/UrlShortner.schema';
import { UrlShortnerController } from './urlShortner.controller';
import { UrlShortnerService } from './urlShortner.service';
import { Analytics, analyticsSchema } from 'src/schemas/Analytics.schema';
import { DeviceInfoService } from 'src/middleware/accessInfo.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UrlShortner.name, schema:urlShortnerSchema  },{name:Analytics.name,schema:analyticsSchema}]),
  ],
  controllers: [
    UrlShortnerController
  ],
  providers: [
    UrlShortnerService,
    DeviceInfoService
  ],
  exports: [
    UrlShortnerService
  ],
})
export class UrlShortnerModule {
 
}
