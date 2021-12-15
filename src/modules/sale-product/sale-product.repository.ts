import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { SaleProduct, SaleProductDocument } from '../../schemas';
import { ISaleProduct } from './interfaces/sale-product.interface';
import { SaleProductEntity } from './sale-product.entity';

@Injectable()
export class SaleProductRepository {
  constructor(
    @InjectModel(SaleProduct.name)
    private readonly saleProductModel: Model<SaleProductDocument>,
  ) {}

  async create(
    saleProductDto: Partial<ISaleProduct>,
    session?: ClientSession,
  ): Promise<SaleProductEntity | null> {
    const saleProduct = new this.saleProductModel(saleProductDto);
    const result = await saleProduct.save({ session: session });

    return SaleProductEntity.fromDB(result);
  }

  async findById(
    id: string,
    select: string,
  ): Promise<SaleProductEntity | null> {
    const result = await this.saleProductModel.findById(id, select).exec();

    return SaleProductEntity.fromDB(result);
  }
}
