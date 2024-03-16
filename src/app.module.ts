import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/urlshortner'),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
