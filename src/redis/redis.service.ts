import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { SetOptions, createClient } from 'redis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS')
    private readonly redisClient: ReturnType<typeof createClient>,
  ) {}

  async set({ expiresIn, key, value }): Promise<string | Buffer> {
    try {
      const options: SetOptions = {};
      expiresIn && (options.EX = expiresIn);
      return this.redisClient.set(key, value, options);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Gets redis Key
   * @param key
   * @returns get
   */
  async get(key: string): Promise<string> {
    try {
      return this.redisClient.get(key);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Deletes redis key
   * @param key
   * @returns delete
   */
  async delete(key: string | string[]): Promise<number> {
    try {
      return this.redisClient.del(key);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
