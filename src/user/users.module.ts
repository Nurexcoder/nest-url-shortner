import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schemas/User.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { ACCESS_TOKEN_SECRET } from 'config';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_SECRET|| ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserService
  ],
  exports: [],
})
export class UserModule {}
