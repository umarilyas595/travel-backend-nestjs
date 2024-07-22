import { Module } from '@nestjs/common';
import { RedisProvider } from './redis.provider';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';

@Module({
  controllers: [RedisController],
  providers: [RedisService, RedisProvider],
  exports: [RedisService],
})
export class RedisModule {}
