import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '../../configs/config.services';
import { IOrders } from '../orders/interfaces/orders.interface';
import { IPaymentOrdersResponse } from './interfaces/payment-orders-response.interface';

@Injectable()
export class PaymentService {
  private readonly logger: Logger;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.logger = new Logger(PaymentService.name);
  }

  async validatePayment(
    data: Partial<IOrders>,
  ): Promise<IPaymentOrdersResponse | null> {
    this.logger.log(`Begin: validatePayment`, data);
    try {
      const headers = {};
      if (this.configService.PAYMENT_API_KEY) {
        headers[this.configService.PAYMENT_API_KEY_HEADER] =
          this.configService.PAYMENT_API_KEY;
      }

      const result = await firstValueFrom(
        this.httpService.post<IPaymentOrdersResponse>(
          '/process-orders/validate',
          data,
          {
            baseURL: this.configService.PAYMENT_HOST_URL,
            headers: headers,
          },
        ),
      );
      this.logger.log(`End: validatePayment`, result.data);

      return result.data;
    } catch (error) {
      this.logger.error(`Error: validatePayment`, data, error);
      throw error;
    }
  }
}
