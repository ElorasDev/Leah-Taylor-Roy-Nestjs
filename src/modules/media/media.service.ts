import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediatDto } from './dto/update-media.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly media_repository: Repository<Media>,
  ) {}

  private getFileType(mimetype: string): 'image' | 'video' | 'document' {
    if (mimetype.startsWith('image/')) {
      return 'image';
    } else if (mimetype.startsWith('video/')) {
      return 'video';
    } else {
      return 'document';
    }
  }

  async createMedia(
    filename: string,
    path: string,
    mimetype: string,
    size: number,
    user: User,
  ): Promise<Media> {
    const fileSizeInMB = size / (1024 * 1024);

    const createMediaDto: CreateMediaDto = {
      filename,
      path,
      mimetype,
      size: fileSizeInMB,
      file_type: this.getFileType(mimetype),
      uploaded_by: user.id,
      published: false,
    };

    const newMedia = this.media_repository.create(createMediaDto);
    return this.media_repository.save(newMedia);
  }

  async findAllMedia(fileType?: string) {
    const query = this.media_repository.createQueryBuilder('media');
    if (fileType) {
      query.where('media.file_type = :file_type', { fileType });
      return await query.getMany();
    } else return this.media_repository.find();
  }

  async findAllPublishedMedia(fileType?: string): Promise<Media[]> {
    const query = this.media_repository
      .createQueryBuilder('media')
      .where('media.published = :published', { published: true });

    if (fileType) {
      query.andWhere('media.file_type = :file_type', { file_type: fileType });
    }

    return query.getMany();
  }

  async findOneMedia(title: string, fileType?: string): Promise<Media[]> {
    const query = this.media_repository.createQueryBuilder('media');
    if (title) {
      query.where('media.title = :title', { title });
    }
    if (fileType) {
      query.andWhere('media.file_type = :file_type', { file_type: fileType });
    }
    return query.getMany();
  }

  async findOnePublishedMedia(id: number): Promise<Media> {
    return this.media_repository
      .createQueryBuilder('media')
      .where('media.id = :id', { id })
      .andWhere('media.published = :published', { published: true })
      .getOne();
  }

  async updateMedia(
    id: number,
    updateMediaDto: UpdateMediatDto,
  ): Promise<Media> {
    if (!updateMediaDto || Object.keys(updateMediaDto).length === 0) {
      throw new BadRequestException('No values provided for update.');
    }

    await this.media_repository.update(id, updateMediaDto);
    const updatedMedia = await this.media_repository.findOne({ where: { id } });
    if (!updatedMedia) {
      throw new NotFoundException(`Media with ID "${id}" not found`);
    }
    return updatedMedia;
  }

  async removeMedia(id: number): Promise<string> {
    await this.media_repository.delete(id);
    return `Event Deleted`;
  }
}
