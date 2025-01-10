import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all news posts' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all news posts',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findAllNews() {
    try {
      return await this.newsService.findAllNewsPost();
    } catch (error) {
      return { message: 'Internal Server Error', error: error.message };
    }
  }

  @Get('published')
  @ApiOperation({ summary: 'Get all published news posts' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all published news posts',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findAllPublishedNewsPost() {
    try {
      return await this.newsService.findAllNewsPost('published');
    } catch (error) {
      throw { message: 'Internal Server Error', error: error.message };
    }
  }

  @Get('archived')
  @ApiOperation({ summary: 'Get all archived news posts' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all archived news posts',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findAllArchivedNewsPost() {
    try {
      return await this.newsService.findAllNewsPost('archived');
    } catch (error) {
      throw { message: 'Internal Server Error', error: error.message };
    }
  }

  @Get('published/:title')
  @ApiOperation({ summary: 'Get a published news post by title' })
  @ApiParam({
    name: 'title',
    required: true,
    description: 'Title of the published news post',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the published news post',
  })
  @ApiResponse({ status: 404, description: 'Published news post not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findOnePublishedNewsPost(@Param('title') title: string) {
    try {
      return await this.newsService.findPublishedPostByTitle(title);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw { message: error.message };
      }
      throw { message: 'Internal Server Error', error: error.message };
    }
  }

  @Get('archived/:title')
  @ApiOperation({ summary: 'Get an archived news post by title' })
  @ApiParam({
    name: 'title',
    required: true,
    description: 'Title of the archived news post',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the archived news post',
  })
  @ApiResponse({ status: 404, description: 'Archived news post not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findOneArchivedNewsPost(@Param('title') title: string) {
    try {
      return await this.newsService.findArchivedPostByTitle(title);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw { message: error.message };
      }
      throw { message: 'Internal Server Error', error: error.message };
    }
  }
}
