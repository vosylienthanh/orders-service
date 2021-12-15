import { Injectable, Logger } from '@nestjs/common';
import { ClientSession } from 'mongoose';
import { ISaleProduct } from './interfaces/sale-product.interface';
import { SaleProductEntity } from './sale-product.entity';
import { SaleProductRepository } from './sale-product.repository';

@Injectable()
export class SaleProductService {
  private readonly logger: Logger;

  constructor(private readonly saleProductRepository: SaleProductRepository) {
    this.logger = new Logger(SaleProductService.name);
  }

  async create(
    saleProductDto: Partial<ISaleProduct>,
    session?: ClientSession,
  ): Promise<string | null> {
    try {
      const result = await this.saleProductRepository.create(
        saleProductDto,
        session,
      );

      return result.id;
    } catch (error) {
      this.logger.error(
        `Error: SaleProductService.create`,
        saleProductDto,
        error,
      );
      throw error;
    }
  }

  async findById(
    id: string,
    select: string,
  ): Promise<SaleProductEntity | null> {
    try {
      return await this.saleProductRepository.findById(id, select);
    } catch (error) {
      this.logger.error(
        `Error: SaleProductService.findById(id: ${id}, select: ${select})`,
        error,
      );
      throw error;
    }
  }
}
