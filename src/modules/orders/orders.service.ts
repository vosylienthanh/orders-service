import { Injectable, Logger } from '@nestjs/common';
import { ClientSession } from 'mongoose';
import { ORDERS_STATUS, PROCESS_STATUS } from '../../commons/constants';
import { PaymentService } from '../payment/payment.service';
import { IOrders } from './interfaces/orders.interface';
import { OrdersEntity } from './orders.entity';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  private readonly logger: Logger;

  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly paymentService: PaymentService,
  ) {
    this.logger = new Logger(OrdersService.name);
  }

  async create(
    ordersDto: Partial<IOrders>,
    session?: ClientSession,
  ): Promise<OrdersEntity | null> {
    try {
      const createdOrders = await this.ordersRepository.create(
        ordersDto,
        session,
      );
      const paymentResult = await this.paymentService.validatePayment(
        createdOrders.toDto(),
      );

      const orders = await this.ordersRepository.updateById(createdOrders.id, {
        status:
          paymentResult.processStatus === PROCESS_STATUS.CONFIRMED
            ? ORDERS_STATUS.CONFIMED
            : ORDERS_STATUS.CANCELLED,
      });

      return orders;
    } catch (error) {
      this.logger.error(`Error: OrdersService.create`, ordersDto, error);
      throw error;
    }
  }

  async findById(id: string, select: string): Promise<OrdersEntity | null> {
    try {
      return await this.ordersRepository.findById(id, select);
    } catch (error) {
      this.logger.error(
        `Error: OrdersService.findById(id: ${id}, select: ${select})`,
        error,
      );
      throw error;
    }
  }

  async findByQuery(
    query: any,
    select: string,
    sort: any,
  ): Promise<OrdersEntity[] | null> {
    try {
      return await this.ordersRepository.findByQuery(query, select, sort);
    } catch (error) {
      this.logger.error(
        `Error: OrdersService.findById(query: ${JSON.stringify(
          query,
        )}, select: ${select}, sort: ${sort})`,
        error,
      );
      throw error;
    }
  }

  async updateById(
    id: string,
    updateData: Partial<IOrders>,
    session?: ClientSession,
  ): Promise<OrdersEntity | null> {
    try {
      return await this.ordersRepository.updateById(id, updateData, session);
    } catch (error) {
      this.logger.error(
        `Error: OrdersService.updateById with id=${id}`,
        updateData,
        error,
      );
      throw error;
    }
  }

  async updateByQuery(
    query: any,
    updateData: Partial<IOrders>,
    session?: ClientSession,
  ): Promise<void> {
    try {
      return await this.ordersRepository.updateByQuery(
        query,
        updateData,
        session,
      );
    } catch (error) {
      this.logger.error(
        `Error: OrdersService.updateById with query=${query}`,
        updateData,
        error,
      );
      throw error;
    }
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      return await this.ordersRepository.deleteById(id);
    } catch (error) {
      this.logger.error(`Error: deleteById(id: ${id})`, error);
      throw error;
    }
  }
}
