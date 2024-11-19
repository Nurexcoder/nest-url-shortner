import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

type UserToken = {
  access_token: string;
  name: string;
  email: string;
} | null;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserToken> {
    const { name, password, email } = createUserDto;
    if (await this.userModel.findOne({ email })) {
      throw new UnauthorizedException(
        'User with this email already exists, Please Login',
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      name,
      password: hashedPassword,
      email,
    });
    await newUser.save();
    const userId = newUser._id.toString();
    console.log(userId);
    const payload = { sub: userId, username: newUser.email };
    console.log(payload);

    return {
      access_token: await this.jwtService.signAsync(payload),
      name: newUser.name,
      email: newUser.email,
    };
  }

  async validateUser(email: string, password: string): Promise<UserToken> {
    const user = await this.userModel
      .findOne({ email })
      .select('+password')
      .exec();

    if (!user || !(await bcrypt.compare(password, user?.password))) {
      throw new UnauthorizedException('Invalid email or Password');
    }
    const payload = { sub: user._id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      name: user.name,
      email: user.email,
    };
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
}
