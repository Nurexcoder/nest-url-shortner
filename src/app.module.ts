import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/users.module';
import { UrlShortnerModule } from './urlShortner/urlStortner.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { AppController } from './app.controller';
import { AppProvider } from './app.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, ignoreEnvFile: true,}),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/urlshortner'),
    RedisModule.forRoot({
      type: 'single',
      url: 'redis-15442.c301.ap-south-1-1.ec2.cloud.redislabs.com:15442',
      options: {
        password: 'ZZfWgjJd8bJuwV11Jtg8P6vn0wjazBpw',
      },
    }),

    UserModule,
    UrlShortnerModule,
  ],
  controllers: [AppController],
  providers: [AppProvider],
})
export class AppModule {}
