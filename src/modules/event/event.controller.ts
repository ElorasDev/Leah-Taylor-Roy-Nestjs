import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { EventService } from './event.service';
import { RegisterClientDto } from './dto/registereClient.dto';
import { EventParticipantsService } from './event-participants.service';

@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly eventParticipants: EventParticipantsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all events',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async findAll() {
    try {
      return this.eventService.findAllEvents();
    } catch (error) {
      throw { message: 'Internal Server Error', error: error.message };
    }
  }

  @Get('/:title/:id')
  @ApiOperation({ summary: 'Get event by title and id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the event',
  })
  @ApiParam({
    name: 'title',
    required: true,
    description: 'Title of the event post',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved event',
  })
  @ApiResponse({ status: 404, description: 'Event not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findEventByTitleAndId(
    @Param('id') id: string,
    @Param('title') title: string,
  ) {
    try {
      return this.eventService.findEvent(Number(id), title);
    } catch (error) {
      throw { message: 'Internal Server Error', error: error.message };
    }
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Get all upcoming events' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all upcoming events',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async findAllUpcomingEvents() {
    try {
      return this.eventService.findAllEvents('upcoming');
    } catch (error) {
      throw { message: 'Internal Server Error', error: error.message };
    }
  }

  @Get('ongoing')
  @ApiOperation({ summary: 'Get all ongoing events' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all ongoing events',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async findAllOngoingEvents() {
    try {
      return this.eventService.findAllEvents('ongoing');
    } catch (error) {
      throw { message: 'Internal Server Error', error: error.message };
    }
  }

  @Get('completed')
  @ApiOperation({ summary: 'Get all completed events' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all completed events',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async findAllCompletedEvents() {
    try {
      return this.eventService.findAllEvents('completed');
    } catch (error) {
      throw { message: 'Internal Server Error', error: error.message };
    }
  }

  @Get('upcoming/:title')
  @ApiOperation({ summary: 'Get an upcoming event' })
  @ApiParam({
    name: 'title',
    required: true,
    description: 'Title of the upcoming event',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the upcoming event',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async findOneUpcomingEventByTitle(@Param('title') title: string) {
    try {
      return this.eventService.findUpcomingEventByTitle(title);
    } catch (error) {
      throw { message: 'Internal Server Error', error: error.message };
    }
  }

  @Get('ongoing/:title')
  @ApiOperation({ summary: 'Get an ongoing event' })
  @ApiParam({
    name: 'title',
    required: true,
    description: 'Title of the ongoing event',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the ongoing event',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async findOneOngoingEventByTitle(@Param('title') title: string) {
    try {
      return this.eventService.findOngoingEventByTitle(title);
    } catch (error) {
      throw { message: 'Internal Server Error', error: error.message };
    }
  }

  @Get('completed/:title')
  @ApiOperation({ summary: 'Get a completed event' })
  @ApiParam({
    name: 'title',
    required: true,
    description: 'Title of the completed event',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the completed event',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async findOneCompletedEventByTitle(@Param('title') title: string) {
    try {
      return this.eventService.findComplatedEventByTitle(title);
    } catch (error) {
      throw { message: 'Internal Server Error', error: error.message };
    }
  }

  @Post('upcoming/:title/:id/register')
  @ApiOperation({ summary: 'Register a client for an ongoing event' })
  @ApiParam({
    name: 'title',
    required: true,
    description: 'Title of the ongoing event',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully registered the client for the event',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async registerClient(
    @Param('title') title: string,
    @Param('id') id: string,
    @Body() registerClient: RegisterClientDto,
  ) {
    try {
      return this.eventParticipants.registerClient(
        title,
        Number(id),
        registerClient,
      );
    } catch (error) {
      throw { message: 'Internal Server Error', error: error.message };
    }
  }
}
