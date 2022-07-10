import { Global, Module } from '@nestjs/common';
import { createClient } from 'redis';
import { REDIS } from './redis.constants';

@Global()
@Module({
  providers: [
    {
      provide: REDIS,
      useFactory: async () => {
        const client = createClient({
          legacyMode: true,
          url: process.env.REDIS_URL,
        });
        await client.connect();

        return client;
      },
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}
