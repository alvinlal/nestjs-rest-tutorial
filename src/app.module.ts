import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import AuthModule from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { REDIS } from './redis/redis.constants';
import { UtilsModule } from './utils/utils.module';
import * as session from 'express-session';
import * as RedisStore from 'connect-redis';
import * as passport from 'passport';
import { RedisClientType } from 'redis';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule,
    AuthModule,
    PrismaModule,
    PostModule,
    UtilsModule,
    UserModule,
  ],
})
export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redis: RedisClientType) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: this.redis as any,
            logErrors: true,
          }),
          name: 'qid',
          secret: process.env.SESSION_SECRET,
          resave: false,
          saveUninitialized: false,
          cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            maxAge: 2160000000,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
