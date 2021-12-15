import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Product, ProductDocument } from '../../schemas';
import { IProduct } from './interfaces/product.interface';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(
    productDto: Partial<IProduct>,
    session?: ClientSession,
  ): Promise<ProductEntity | null> {
    const productModel = new this.productModel(productDto);
    const createdProduct = await productModel.save({
      session: session,
    });

    return ProductEntity.fromDB(createdProduct);
  }

  async findById(id: string, select: string): Promise<ProductEntity | null> {
    const matchProduct = await this.productModel.findById(id, select).exec();

    return ProductEntity.fromDB(matchProduct);
  }

  async findByQuery(query: any, select): Promise<ProductEntity[] | null> {
    const matchProducts = await this.productModel.find(query, select);
    return matchProducts?.map((item) => ProductEntity.fromDB(item));
  }
}
