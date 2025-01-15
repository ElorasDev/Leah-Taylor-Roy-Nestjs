import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { News } from '../news/entities/news.entity';
import { Event } from '../event/entities/event.entity';
import { EventParticipants } from '../event/entities/event-participants.entity';
import { Blog } from '../blog/entities/blog.entity';
import { Media } from '../media/entities/media.entity';
import { UsersModule } from '../users/users.module';
import { NewsModule } from '../news/news.module';
import { BlogModule } from '../blog/blog.module';
import { EventModule } from '../event/event.module';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      News,
      Event,
      EventParticipants,
      Blog,
      Media,
    ]),
    UsersModule,
    NewsModule,
    BlogModule,
    EventModule,
    MediaModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
