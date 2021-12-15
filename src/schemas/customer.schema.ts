import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

type CustomerDocument = Customer & Document;

@Schema({
  timestamps: true,
})
class Customer {
  @Prop({
    required: true,
    maxlength: 50,
  })
  fullName: string;

  @Prop({
    required: true,
    maxlength: 20,
  })
  phone: string;

  @Prop({
    maxlength: 500,
  })
  address: string; // This should be address schema. However, we don't need to deep dive on this field.
}

const CustomerSchema = SchemaFactory.createForClass(Customer);

export { Customer, CustomerDocument, CustomerSchema };
