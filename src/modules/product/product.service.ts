import { Injectable, Logger } from '@nestjs/common';
import { ClientSession } from 'mongoose';
import { IProduct } from './interfaces/product.interface';
import { ProductRepository } from './prduct.repository';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  private readonly logger: Logger;

  constructor(private readonly productRepository: ProductRepository) {
    this.logger = new Logger(ProductService.name);
  }

  async create(
    productDto: Partial<IProduct>,
    session?: ClientSession,
  ): Promise<string | null> {
    try {
      const createdProduct = await this.productRepository.create(
        productDto,
        session,
      );

      return createdProduct?.id;
    } catch (error) {
      this.logger.error(`Error: ProductService.create`, productDto, error);
      throw error;
    }
  }

  async findById(id: string, select: string): Promise<ProductEntity | null> {
    try {
      return this.productRepository.findById(id, select);
    } catch (error) {
      this.logger.error(
        `Error: ProductService.findById(id: ${id}, select: ${select})`,
        error,
      );
      throw error;
    }
  }
}
