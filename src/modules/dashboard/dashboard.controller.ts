import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  Delete,
  Param,
  Patch,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
  ApiParam,
} from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateNewsPostDto } from '../news/dto/create-news-post.dto';
import { NewsService } from '../news/news.service';
import { User } from '../users/entities/user.entity';
import { UpdateNewsPostDto } from '../news/dto/update-news-post.dto';
import { CreatePostDto } from '../blog/dto/create-post.dto';
import { UpdatePostDto } from '../blog/dto/update-post.dto';
import { PostService } from '../blog/post.service';
import { CreateEventDto } from '../event/dto/create-event.dto';
import { EventService } from '../event/event.service';
import { UpdateEventDto } from '../event/dto/update-event.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from '../media/media.service';
import { EventParticipantsService } from '../event/event-participants.service';
import { UpdateMediatDto } from '../media/dto/update-media.dto';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly newsService: NewsService,
    private readonly blogService: PostService,
    private readonly eventService: EventService,
    private readonly mediaService: MediaService,
    private readonly eventParticipantsService: EventParticipantsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get dashboard data' })
  @ApiResponse({ status: 200, description: 'Return dashboard data.' })
  async getDashboardData() {
    return this.dashboardService.getDashboardData();
  }

  @UseGuards(JwtAuthGuard)
  @Get('event-participants/:event_id')
  @ApiOperation({ summary: 'Get participants of an event' })
  @ApiParam({
    name: 'event_id',
    required: true,
    description: 'ID of the event',
  })
  @ApiResponse({
    status: 200,
    description: 'Return participants of the event.',
  })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async getEventParticipants(@Param('event_id') eventId: string) {
    return this.eventParticipantsService.findParticipants(Number(eventId));
  }

  @UseGuards(JwtAuthGuard)
  @Post('post-news')
  @ApiOperation({ summary: 'Post a news article' })
  @ApiResponse({
    status: 201,
    description: 'The news article has been successfully posted.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async postNews(
    @Request() req: { user: User },
    @Body() createNewsDto: CreateNewsPostDto,
  ) {
    return this.newsService.createPostNews(createNewsDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('post-blog')
  @ApiOperation({ summary: 'Post a blog article' })
  @ApiResponse({
    status: 201,
    description: 'The blog article has been successfully posted.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async postBlog(
    @Request() req: { user: User },
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.blogService.createPost(createPostDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('post-event')
  @ApiOperation({ summary: 'Post an event' })
  @ApiResponse({
    status: 201,
    description: 'The event has been successfully posted.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async postEvent(
    @Request() req: { user: User },
    @Body() createEventDto: CreateEventDto,
  ) {
    console.log('data is:', createEventDto);
    return this.eventService.createEvent(createEventDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a file' })
  @ApiResponse({
    status: 201,
    description: 'The file has been successfully uploaded.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post()
  async uploadFile(
    @Body()
    body: {
      filename: string;
      path: string;
      mimetype: string;
      size: number;
      published: boolean;
    },
    @Request() req: { user: User },
  ) {
    return this.mediaService.createMedia(
      body.filename,
      body.path,
      body.mimetype,
      body.size,
      req.user,
      body.published,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-news/:id')
  @ApiOperation({ summary: 'Update a news article' })
  @ApiResponse({
    status: 200,
    description: 'The news article has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'News post not found.' })
  async updateNews(
    @Param('id') id: number,
    @Body() updateNewsPostDto: UpdateNewsPostDto,
  ) {
    return this.newsService.updatePost(Number(id), updateNewsPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-file/:id')
  @ApiOperation({ summary: 'Update a file' })
  @ApiResponse({
    status: 200,
    description: 'The file has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'File not found.' })
  async updateFile(
    @Param('id') id: number,
    @Body() updateNewsPostDto: UpdateMediatDto,
  ) {
    if (updateNewsPostDto.published === undefined) {
      throw new BadRequestException('Published status is required.');
    }

    const updateMediaDto = {
      published: updateNewsPostDto.published,
    };

    return this.mediaService.updateMedia(Number(id), updateMediaDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-blog/:id')
  @ApiOperation({ summary: 'Update a blog article' })
  @ApiResponse({
    status: 200,
    description: 'The blog article has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Blog post not found.' })
  async updateBlog(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.blogService.updatePost(Number(id), updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-event/:id')
  @ApiOperation({ summary: 'Update an event' })
  @ApiResponse({
    status: 200,
    description: 'The event has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async updateEvent(
    @Param('id') id: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.update(Number(id), updateEventDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove-news/:id')
  @ApiOperation({ summary: 'Remove a news article' })
  @ApiResponse({
    status: 200,
    description: 'The news article has been successfully removed.',
  })
  @ApiResponse({ status: 404, description: 'News post not found.' })
  async removeNews(@Param('id') id: number) {
    return this.newsService.remove(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove-blog/:id')
  @ApiOperation({ summary: 'Remove a blog article' })
  @ApiResponse({
    status: 200,
    description: 'The blog article has been successfully removed.',
  })
  @ApiResponse({ status: 404, description: 'Blog post not found.' })
  async deleteBlog(@Param('id') id: number) {
    return this.blogService.remove(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove-event/:id')
  @ApiOperation({ summary: 'Remove an event' })
  @ApiResponse({
    status: 200,
    description: 'The event has been successfully removed.',
  })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async deleteEvent(@Param('id') id: number) {
    return this.eventService.remove(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-file/:id')
  @ApiOperation({ summary: 'Delete a file' })
  @ApiResponse({
    status: 200,
    description: 'The file has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'File not found.' })
  async deleteFile(@Param('id') id: number) {
    return this.mediaService.removeMedia(Number(id));
  }
}
