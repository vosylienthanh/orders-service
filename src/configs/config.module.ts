import { Module } from '@nestjs/common';
import { ConfigService } from './config.services';

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
