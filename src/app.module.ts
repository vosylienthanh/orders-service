import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from './configs/config.module';
import { ConfigService } from './configs/config.services';
import { ApiKeyMiddleware } from './middlewares/api-key.middleware';
import { CustomerModule } from './modules/customer/customer.module';
import { OrdersController } from './modules/orders/orders.controller';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductModule } from './modules/product/product.module';
import { SaleProductModule } from './modules/sale-product/sale-product.module';
import { TaskScheduleModule } from './modules/task-schedule/task-schedule.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.MONGO_URI,
        };
      },
    }),
    ScheduleModule.forRoot(),
    ProductModule,
    CustomerModule,
    SaleProductModule,
    OrdersModule,
    TaskScheduleModule,
  ],
  providers: [ConfigService],
  controllers: [OrdersController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
