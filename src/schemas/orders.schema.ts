import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer, SaleProduct } from '.';
import { ORDERS_STATUS } from '../commons/constants';

type OrdersDocument = Orders & Document;

@Schema({
  timestamps: true,
})
class Orders {
  @Prop({
    required: true,
    ref: Customer.name,
    type: Types.ObjectId,
  })
  customerId: string;

  @Prop({
    required: true,
    enum: ORDERS_STATUS,
    default: ORDERS_STATUS.CREATED,
  })
  status: ORDERS_STATUS;

  @Prop({
    required: true,
    default: 0,
    min: [0, `Value must not be negative`],
  })
  totalPrice: number;

  @Prop({
    required: true,
    maxlength: 500,
  })
  shippingAddress: string;

  @Prop({
    required: true,
    maxlength: 500,
  })
  billingAddress: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

const OrdersSchema = SchemaFactory.createForClass(Orders);

export { OrdersSchema, OrdersDocument, Orders };
