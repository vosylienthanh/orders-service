import {
  Injectable,
  Logger,
  LoggerService,
  OnModuleInit,
} from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { ORDERS_STATUS } from '../../commons/constants';
import { ConfigService } from '../../configs/config.services';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class OrdersScheduleService implements OnModuleInit {
  private readonly logger: Logger;
  constructor(
    private readonly configService: ConfigService,
    private readonly scheduleRegistry: SchedulerRegistry,
    private readonly ordersService: OrdersService,
  ) {
    this.logger = new Logger(OrdersScheduleService.name);
  }

  onModuleInit() {
    const job = new CronJob({
      cronTime: this.configService.ORDER_CRONJOB_SCHEDULE,
      onTick: () => {
        OrdersScheduleService.autoDeliverOrdersHandler(
          this.logger,
          this.ordersService,
        );
      },
      runOnInit: true,
    });
    this.scheduleRegistry.addCronJob(
      this.configService.AUTO_DELIVER_CRONJOB_NAME,
      job,
    );
    job.start();
  }

  private static async autoDeliverOrdersHandler(
    logger: Logger,
    ordersService: OrdersService,
  ) {
    logger.log(`Start: autoDeliverOrdersHandler`);

    try {
      await ordersService.updateByQuery(
        {
          status: ORDERS_STATUS.CONFIMED,
        },
        {
          status: ORDERS_STATUS.DELIVERED,
        },
      );
    } catch (error) {
      logger.error(`Error: autoDeliverOrdersHandler`, error);
    }

    logger.log(`End: autoDeliverOrdersHandler`);
  }
}
