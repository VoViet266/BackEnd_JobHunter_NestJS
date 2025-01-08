import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongodb';
import mongoose, { HydratedDocument } from 'mongoose';
import { TypeImage } from 'src/Constant/typeImage.enum';

export type ProductDocument = HydratedDocument<Product>;
class Image {
  @Prop({ type: String, enum: TypeImage })
  type: TypeImage;

  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: String })
  alt: string;
}
@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  @IsNotEmpty({ message: 'Product name is required' })
  name: string;
  @Prop()
  description: string;
  @Prop({ required: true })
  @IsNotEmpty({ message: 'Price is required' })
  price: number;
  @Prop()
  discount: number;
  @Prop()
  categoryId: ObjectId;
  @Prop()
  brandId: ObjectId;
  @Prop()
  images: Image[];

  @Prop()
  createdAt: Date;
  @Prop({
    type: Object,
  })
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
  @Prop()
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
