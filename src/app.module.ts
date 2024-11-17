import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/users.module';
import { UrlShortnerModule } from './urlShortner/urlStortner.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { AppController } from './app.controller';
import { AppProvider } from './app.provider';
import { ConfigModule } from '@nestjs/config';
import { DeviceInfoService } from './middleware/accessInfo.middleware';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    RedisModule.forRoot({
      type: 'single',
      url: process.env.REDIS_URL,
      options: {
        password: process.env.REDIS_PASSWORD,
      },
    }),

    UserModule,
    UrlShortnerModule,
  ],
  controllers: [AppController],
  providers: [AppProvider, DeviceInfoService],
})
export class AppModule {}
