import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import _ from 'lodash';
import { IOrders } from './interfaces/orders.interface';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  private readonly logger: Logger;
  constructor(private readonly ordersService: OrdersService) {
    this.logger = new Logger(OrdersController.name);
  }

  @Post()
  async create(@Body() body: IOrders): Promise<Partial<IOrders>> {
    this.logger.log(`Begin: create`, body);

    const result = await this.ordersService.create(body);

    this.logger.log(`End: create`);

    return result.toDto();
  }

  @Patch()
  async findAll(): Promise<Partial<IOrders>[]> {
    this.logger.log(`Begin: findAll`);

    const result = await this.ordersService.findByQuery({}, '', {
      createdAt: -1,
    });

    this.logger.log(`End: findAll`);

    return result.map((item) => item.toDto());
  }

  @Post('/:id')
  async updateById(
    @Param('id') id: string,
    @Body() body: IOrders,
  ): Promise<Partial<IOrders>> {
    this.logger.log(`Begin: updateById`, body);
    if (!body.status) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Validation error: missing status',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.ordersService.updateById(id, body);

    this.logger.log(`End: updateById`);

    return result.toDto();
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string): Promise<boolean> {
    try {
      return await this.ordersService.deleteById(id);
    } catch (error) {
      this.logger.error(`Error: delete(id: ${id})`, error);
      throw error;
    }
  }
}
