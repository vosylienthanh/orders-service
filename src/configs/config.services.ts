import { Global } from '@nestjs/common';
import { config as DotenvSafeConfig } from 'dotenv-safe';
import { join as pathJoin } from 'path';

@Global()
export class ConfigService {
  constructor() {
    DotenvSafeConfig({
      allowEmptyValues: true,
      sample: pathJoin(__dirname, '../../.env.template'),
      path: pathJoin(__dirname, '../../.env'),
    });
  }

  get NODE_ENV(): string {
    return process.env.NODE_ENV || 'development';
  }

  get PORT(): number {
    return Number(process.env.PORT) || 3000;
  }

  get MONGO_URI(): string {
    return process.env.MONGO_URI;
  }

  get PAYMENT_HOST_URL(): string {
    return process.env.PAYMENT_HOST_URL;
  }

  get ORDER_CRONJOB_SCHEDULE(): string {
    return process.env.ORDER_CRONJOB_SCHEDULE;
  }

  get AUTO_DELIVER_CRONJOB_NAME(): string {
    return process.env.AUTO_DELIVER_CRONJOB_NAME;
  }

  get API_KEY(): string {
    return process.env.API_KEY;
  }

  get API_KEY_HEADER(): string {
    return process.env.API_KEY_HEADER;
  }

  get PAYMENT_API_KEY(): string {
    return process.env.PAYMENT_API_KEY;
  }

  get PAYMENT_API_KEY_HEADER(): string {
    return process.env.PAYMENT_API_KEY_HEADER;
  }
}
