import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Blog)
    private readonly blog_repository: Repository<Blog>,
  ) {}

  async createPost(createPostDto: CreatePostDto, user: User): Promise<Blog> {
    const { title, category_id, content, index_image_url, status } =
      createPostDto;

    const newPost = this.blog_repository.create({
      title,
      category_id,
      content,
      index_image_url,
      status,
      user,
    });

    await this.blog_repository.save(newPost);
    return newPost;
  }

  async findAllPost(status?: string) {
    const query = this.blog_repository.createQueryBuilder('blog');

    if (status) {
      query.where('blog.status = :status', { status });
    }

    return await query.getMany();
  }

  async findPublishedPostByTitle(title: string) {
    const post = await this.blog_repository.findOne({
      where: {
        title,
        status: 'published',
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
        `Published post with title "${title}" not found`,
      );
    }
    return post;
  }

  async findArchivedPostByTitle(title: string) {
    const post = await this.blog_repository.findOne({
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
    const post = await this.blog_repository.findOne({
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

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Blog> {
    await this.blog_repository.update(id, updatePostDto);
    const updatedPost = await this.blog_repository.findOne({ where: { id } });
    if (!updatedPost) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
    return updatedPost;
  }

  async remove(id: number): Promise<void> {
    const post = await this.blog_repository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
    await this.blog_repository.delete(id);
  }
}
