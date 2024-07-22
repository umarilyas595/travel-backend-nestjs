import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

const onRedisError = (err: any) => {
  console.error('REDIS ERROR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', err);
  Logger.error('REDIS ERROR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  Logger.error(err);
};

const onRedisConnect = () => {
  console.log('Redis connected >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
};

const onRedisReconnecting = () => {
  console.log('Redis reconnecting >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
};

const onRedisReady = () => {
  console.log('Redis ready! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
};

const client = createClient({
  name: 'whodoical',
  url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  pingInterval: 240000, // 4 minutes
  socket: {
    connectTimeout: 50000,
    keepAlive: 1,
    tls: process.env.NODE_ENV === 'production' ? true : false,
    rejectUnauthorized: false,
  },
});

client.on('error', onRedisError);
client.on('connect', onRedisConnect);
client.on('reconnecting', onRedisReconnecting);
client.on('ready', onRedisReady);

client.connect();

export const RedisProvider = {
  provide: 'REDIS',
  useValue: client,
};
