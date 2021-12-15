import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PRODUCT_UNIT } from '../commons/constants';

type ProductDocument = Product & Document;

@Schema({
  timestamps: true,
})
class Product {
  @Prop({
    maxlength: 50,
    required: true,
  })
  name: string;

  @Prop({
    maxlength: 50,
    unique: true,
    required: true,
  })
  sku: string;

  @Prop({
    min: [0, `Value must not be negative`],
    default: 0,
  })
  salePrice: number;

  @Prop({
    min: [0, `Value must not be negative`],
    default: 0,
  })
  importPrice: number;

  @Prop({
    enum: PRODUCT_UNIT,
    default: PRODUCT_UNIT.PIECE,
  })
  unit: PRODUCT_UNIT;

  @Prop({
    min: [0, `Value must not be negative`],
    default: 0,
  })
  weight: number;

  @Prop({
    min: [0, `Value must not be negative`],
    default: 0,
  })
  volume: number;

  @Prop({
    maxlength: 1000,
  })
  image: string;
}

const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({
  name: 'text',
  sku: 'text',
});

export { ProductDocument, ProductSchema, Product };
