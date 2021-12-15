import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Orders, OrdersDocument } from '../../schemas';
import { IOrders } from './interfaces/orders.interface';
import { OrdersEntity } from './orders.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel(Orders.name)
    private readonly ordersModel: Model<OrdersDocument>,
  ) {}

  async create(
    ordersDto: Partial<IOrders>,
    session?: ClientSession,
  ): Promise<OrdersEntity | null> {
    const ordersModel = new this.ordersModel(ordersDto);
    const result = await ordersModel.save({ session: session });

    return OrdersEntity.fromDB(result);
  }

  async findById(id: string, select: string): Promise<OrdersEntity | null> {
    const result = await this.ordersModel.findById(id, select).exec();

    return OrdersEntity.fromDB(result);
  }

  async findByQuery(
    query: any,
    select: string,
    sort: any,
  ): Promise<OrdersEntity[] | null> {
    const result = await this.ordersModel
      .find(query)
      .select(select)
      .sort(sort)
      .exec();

    return result?.map((item) => OrdersEntity.fromDB(item));
  }

  async updateById(
    id: string,
    updateData: Partial<IOrders>,
    session?: ClientSession,
  ): Promise<OrdersEntity | null> {
    const result = await this.ordersModel
      .findByIdAndUpdate(
        {
          _id: id,
        },
        updateData,
        {
          new: true,
        },
      )
      .session(session)
      .exec();

    return OrdersEntity.fromDB(result);
  }

  async updateByQuery(
    query: any,
    updateData: Partial<IOrders>,
    session?: ClientSession,
  ): Promise<void> {
    const result = await this.ordersModel
      .updateMany(query, updateData)
      .session(session)
      .exec();
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.ordersModel.deleteOne({
      _id: id,
    });

    return result.deletedCount > 0;
  }
}
