import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventParticipants } from './entities/event-participants.entity';
import { EventParticipantsService } from './event-participants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventParticipants])],
  controllers: [EventController],
  providers: [EventService, EventParticipantsService],
  exports: [EventService, EventParticipantsService],
})
export class EventModule {}
