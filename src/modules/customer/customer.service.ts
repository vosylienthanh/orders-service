import { Injectable, Logger } from '@nestjs/common';
import { ClientSession } from 'mongoose';
import { Customer } from '../../schemas';
import { CustomerEntity } from './customer.entity';
import { CustomerRepository } from './customer.repository';
import { ICustomer } from './interfaces/customer.interface';

@Injectable()
export class CustomerService {
  private readonly logger: Logger;

  constructor(private readonly customerRepository: CustomerRepository) {
    this.logger = new Logger(Customer.name);
  }

  async create(
    customerDto: Partial<ICustomer>,
    session?: ClientSession,
  ): Promise<string | null> {
    try {
      const result = await this.customerRepository.create(customerDto, session);

      return result.id;
    } catch (error) {
      this.logger.error(`Error: CustomerService.create`, customerDto, error);
      throw error;
    }
  }

  async findById(id: string, select: string): Promise<CustomerEntity | null> {
    try {
      return await this.customerRepository.findById(id, select);
    } catch (error) {
      this.logger.error(
        `Error: CustomerService.findById(id: ${id}, select: ${select})`,
        error,
      );
    }
  }
}
