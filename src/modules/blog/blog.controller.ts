import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: PostService) {}

  @Get('posts')
  @ApiOperation({ summary: 'Get all blog posts' })
  findAll() {
    return this.blogService.findAllPost();
  }

  @Get('posts/published/:title')
  @ApiOperation({ summary: 'Get a published blog post by title' })
  @ApiParam({
    name: 'title',
    required: true,
    description: 'Title of the published post',
  })
  async findOnePublishedPost(@Param('title') title: string) {
    try {
      return await this.blogService.findPublishedPostByTitle(title);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { message: error.message };
      }
      throw error;
    }
  }

  @Get('posts/archived/:title')
  @ApiOperation({ summary: 'Get an archived blog post by title' })
  @ApiParam({
    name: 'title',
    required: true,
    description: 'Title of the archived post',
  })
  async findOneArchivedPost(@Param('title') title: string) {
    try {
      return await this.blogService.findArchivedPostByTitle(title);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { message: error.message };
      }
      throw error;
    }
  }

  @Get('posts/draft/:title')
  @ApiOperation({ summary: 'Get a draft blog post by title' })
  @ApiParam({
    name: 'title',
    required: true,
    description: 'Title of the draft post',
  })
  async findOneDraftPost(@Param('title') title: string) {
    try {
      return await this.blogService.findDraftPostByTitle(title);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { message: error.message };
      }
      throw error;
    }
  }
}
