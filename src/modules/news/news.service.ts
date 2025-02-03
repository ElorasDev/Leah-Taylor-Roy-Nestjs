import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewsPostDto } from './dto/create-news-post.dto';
import { News } from './entities/news.entity';
import { User } from '../users/entities/user.entity';
import { UpdatePostDto } from '../blog/dto/update-post.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsPost_repository: Repository<News>,
  ) {}

  async createPostNews(createNewsPostDto: CreateNewsPostDto, user: User) {
    const { title, category_id, content, index_image_url, status } =
      createNewsPostDto;

    const newPost = this.newsPost_repository.create({
      title,
      category_id: category_id || null,
      content,
      index_image_url,
      status,
      user: user,
    });

    await this.newsPost_repository.save(newPost);
    return newPost;
  }

  async findAllNewsPost(status?: string) {
    const query = this.newsPost_repository.createQueryBuilder('news');
    if (status) {
      query.where('news.status = :status', { status });
      return await query.getMany();
    } else return this.newsPost_repository.find();
  }

  async findPublishedPostByIdAndTitle(id: number, title: string) {
    const post = await this.newsPost_repository.findOne({
      where: {
        id,
        title,
        status: 'published',
      },
      select: [
        'id',
        'title',
        'user',
        'index_image_url',
        'content',
        'created_at',
        'updated_at',
      ],
    });

    if (!post) {
      throw new NotFoundException(
        `Published post with id "${id}" and title "${title}" not found`,
      );
    }
    return post;
  }

  async findArchivedPostByTitle(title: string) {
    const post = await this.newsPost_repository.findOne({
      where: {
        title,
        status: 'archived',
      },
      select: [
        'title',
        'user',
        'index_image_url',
        'content',
        'created_at',
        'like',
      ],
    });
    if (!post) {
      throw new NotFoundException(
        `Archived post with title "${title}" not found`,
      );
    }
    return post;
  }

  async findDraftPostByTitle(title: string) {
    const post = await this.newsPost_repository.findOne({
      where: {
        title,
        status: 'draft',
      },
      select: [
        'title',
        'user',
        'index_image_url',
        'content',
        'created_at',
        'like',
      ],
    });
    if (!post) {
      throw new NotFoundException(`Draft post with title "${title}" not found`);
    }
    return post;
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<News> {
    await this.newsPost_repository.update(id, updatePostDto);
    const updatedPost = await this.newsPost_repository.findOne({
      where: { id },
    });
    if (!updatedPost) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
    return updatedPost;
  }

  async remove(id: number): Promise<void> {
    const post = await this.newsPost_repository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
    await this.newsPost_repository.delete(id);
  }
}
