import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Orders, Product } from '.';

export type SaleProductDocument = SaleProduct & Document;

@Schema({
  timestamps: true,
})
export class SaleProduct {
  @Prop({
    type: Types.ObjectId,
    ref: Product.name,
    required: true,
    index: true,
  })
  productId: string;

  @Prop({
    type: Types.ObjectId,
    ref: Orders.name,
    required: true,
    index: true,
  })
  ordersId: string;

  @Prop({
    min: [0, `Value must not be negative`],
    default: 0,
  })
  price: number;

  @Prop({
    min: [0, `Value must not be negative`],
    default: 0,
  })
  discount: number;

  @Prop({
    min: [1, `Value must be positive`],
    default: 1,
  })
  amount: number;
}

export const SaleProductSchema = SchemaFactory.createForClass(SaleProduct);
