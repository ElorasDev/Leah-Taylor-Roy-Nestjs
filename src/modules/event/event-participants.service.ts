import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventParticipants } from './entities/event-participants.entity';
import { RegisterClientDto } from './dto/registereClient.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventParticipantsService {
  constructor(
    @InjectRepository(EventParticipants)
    private readonly eventParticipantsRepository: Repository<EventParticipants>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async registerClient(
    title: string,
    registerClient: RegisterClientDto,
  ): Promise<EventParticipants> {
    const { fullname, email, phone_number } = registerClient;

    const event = await this.eventRepository.findOne({ where: { title } });
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const existingParticipant = await this.eventParticipantsRepository.findOne({
      where: { email, event },
    });
    if (existingParticipant) {
      throw new BadRequestException(
        'User is already registered for this event',
      );
    }

    const newClient = this.eventParticipantsRepository.create({
      fullname,
      email,
      phone_number,
      event,
    });

    await this.eventParticipantsRepository.save(newClient);

    event.members += 1;
    await this.eventRepository.save(event);

    return newClient;
  }

  async findParticipants(eventId: number): Promise<EventParticipants[]> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }
    const participants = await this.eventParticipantsRepository.find({
      where: { event },
    });
    return participants;
  }
}
