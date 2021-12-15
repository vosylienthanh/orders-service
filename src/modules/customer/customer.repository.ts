import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Customer, CustomerDocument } from '../../schemas';
import { CustomerEntity } from './customer.entity';
import { ICustomer } from './interfaces/customer.interface';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async create(
    customerDto: Partial<ICustomer>,
    session?: ClientSession,
  ): Promise<CustomerEntity | null> {
    const customerModel = new this.customerModel(customerDto);
    const createdRecord = await customerModel.save({
      session: session,
    });

    return CustomerEntity.fromDB(createdRecord);
  }

  async findById(id: string, select: string): Promise<CustomerEntity | null> {
    const customer = await this.customerModel.findById(id, select).exec();

    return CustomerEntity.fromDB(customer);
  }
}
