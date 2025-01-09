import { Injectable, Inject } from '@nestjs/common';
import { RateLimiterRedis } from 'rate-limiter-flexible';

@Injectable()
export class RateLimiterService {
  private limiter: RateLimiterRedis;

  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: any) {
    this.limiter = new RateLimiterRedis({
      storeClient: this.redisClient,
      keyPrefix: 'login_fail',
      points: 5,
      duration: 60 * 60,
      blockDuration: 60 * 15,
    });
  }

  async consume(key: string): Promise<void> {
    await this.limiter.consume(key);
  }

  async get(key: string) {
    return this.limiter.get(key);
  }

  async reset(key: string): Promise<void> {
    await this.limiter.delete(key);
  }
}
