import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SaleProduct, SaleProductSchema } from '../../schemas';
import { SaleProductRepository } from './sale-product.repository';
import { SaleProductService } from './sale-product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SaleProduct.name,
        schema: SaleProductSchema,
      },
    ]),
  ],
  providers: [SaleProductRepository, SaleProductService],
})
export class SaleProductModule {}
