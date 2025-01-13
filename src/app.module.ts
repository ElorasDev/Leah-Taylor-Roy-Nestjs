import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { pool } from './common/db';
import { BlogModule } from './modules/blog/blog.module';
import { NewsModule } from './modules/news/news.module';
import { EventModule } from './modules/event/event.module';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

@Module({
  imports: [
    TypeOrmModule.forRoot(pool),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2d' },
    }),
    AuthModule,
    UsersModule,
    BlogModule,
    NewsModule,
    EventModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
