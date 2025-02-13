import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly event_repository: Repository<Event>,
  ) {}

  async findAllEvents(status?: string) {
    const query = this.event_repository.createQueryBuilder('events');
    if (status) {
      query.where('events.status = :status', { status });
      return await query.getMany();
    } else return this.event_repository.find();
  }

  async findEvent(id: number, title: string) {
    const event = await this.event_repository.findOne({
      where: {
        id,
        title,
      },
      select: [
        'id',
        'title',
        'user',
        'index_image_url',
        'description',
        'status',
        'location',
        'start_datetime',
        'end_datetime',
        'created_at',
        'updated_at',
      ],
    });

    if (!event) {
      throw new NotFoundException(
        `Event with id "${id}" and title "${title}" not found`,
      );
    }
    return event;
  }

  async findUpcomingEventByTitle(title: string) {
    const event = await this.event_repository.findOne({
      where: {
        title,
        status: 'upcoming',
      },
      select: [
        'title',
        'created_at',
        'description',
        'category_id',
        'location',
        'status',
        'user',
        'start_datetime',
        'end_datetime',
      ],
    });
    if (!event)
      throw new NotFoundException(
        `upcoing event with title "${title} not found" `,
      );
    return event;
  }

  async findOngoingEventByTitle(title: string) {
    const event = await this.event_repository.findOne({
      where: {
        title,
        status: 'ongoing',
      },
      select: [
        'title',
        'created_at',
        'description',
        'category_id',
        'location',
        'status',
        'user',
        'start_datetime',
        'end_datetime',
      ],
    });
    if (!event)
      throw new NotFoundException(
        `upcoing event with title "${title} not found" `,
      );
    return event;
  }

  async findComplatedEventByTitle(title: string) {
    const event = await this.event_repository.findOne({
      where: {
        title,
        status: 'complated',
      },
      select: [
        'title',
        'created_at',
        'description',
        'category_id',
        'location',
        'status',
        'user',
        'start_datetime',
        'end_datetime',
      ],
    });
    if (!event)
      throw new NotFoundException(
        `upcoing event with title "${title} not found" `,
      );
    return event;
  }

  async findCanceledEventByTitle(title: string) {
    const event = await this.event_repository.findOne({
      where: {
        title,
        status: 'canceled',
      },
      select: [
        'title',
        'created_at',
        'description',
        'category_id',
        'location',
        'status',
        'user',
        'start_datetime',
        'end_datetime',
      ],
    });
    if (!event)
      throw new NotFoundException(
        `upcoing event with title "${title} not found" `,
      );
    return event;
  }

  async createEvent(createEventDto: CreateEventDto, user: User) {
    const {
      title,
      index_image_url,
      description,
      start_datetime,
      end_datetime,
      location,
      status,
    } = createEventDto;

    const newEvent = this.event_repository.create({
      title,
      description,
      index_image_url,
      start_datetime,
      end_datetime,
      location,
      status,
      user,
    });

    await this.event_repository.save(newEvent);
    return newEvent;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    await this.event_repository.update(id, updateEventDto);
    const updateEvent = await this.event_repository.findOne({
      where: { id },
    });

    if (!updateEvent)
      throw new NotFoundException(`Event with ID "${id} not found"`);

    return updateEvent;
  }

  async remove(id: number): Promise<string> {
    const event = await this.event_repository.findOne({ where: { id } });
    if (!event) throw new NotFoundException(`Event with ID "${id} not found"`);
    await this.event_repository.delete(id);
    return `Event Deleted`;
  }
}
