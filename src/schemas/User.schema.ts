import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({select:false})
  password: string;

  @Prop({unique:true})
  email: string;

  @Prop()
  avatarUrl?: string;
}

export const userSchema = SchemaFactory.createForClass(User);
