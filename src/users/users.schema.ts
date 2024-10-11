import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Users', strict: 'throw', minimize: false })
export class User extends Document {
  @Prop({ require: true })
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  nickname: string;

  @Prop({ default: '' })
  imageUrl: string;

  @Prop({ default: '' })
  introduction: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
