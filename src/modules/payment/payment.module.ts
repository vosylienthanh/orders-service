import { HttpModule, HttpService } from '@nestjs/axios';
import { Controller, Module } from '@nestjs/common';
import { ConfigModule } from '../../configs/config.module';
import { ConfigService } from '../../configs/config.services';
import { PaymentService } from './payment.service';

@Module({
  imports: [HttpModule.register({}), ConfigModule],
  providers: [PaymentService],
})
export class PaymentModule {}
