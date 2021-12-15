import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '../../configs/config.module';
import { OrdersModule } from '../orders/orders.module';
import { OrdersScheduleService } from './orders-schedule.service';

@Module({
  imports: [ConfigModule, OrdersModule],
  providers: [OrdersScheduleService],
})
export class TaskScheduleModule {}
