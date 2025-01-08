import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { pool } from './common/db';
import { L_J_JWT } from './common/constant/jwt.const';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(pool),
    PassportModule,
    JwtModule.register({
      secret: L_J_JWT,
      signOptions: { expiresIn: '2d' },
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
