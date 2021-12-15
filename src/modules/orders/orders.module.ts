import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../../configs/config.module';
import { Orders, OrdersSchema } from '../../schemas';
import { PaymentModule } from '../payment/payment.module';
import { PaymentService } from '../payment/payment.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Orders.name,
        schema: OrdersSchema,
      },
    ]),
    HttpModule,
    ConfigModule,
    PaymentModule,
  ],
  providers: [OrdersRepository, OrdersService, PaymentService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
