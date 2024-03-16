import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ unique: true })
  name: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  avatarUrl?: string;
}

export const userSchema = SchemaFactory.createForClass(User);
