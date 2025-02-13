import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSupportDto } from './dto/create-support.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Support } from './entities/support.entity';

@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(Support)
    private createRepository: Repository<Support>,
  ) {}
  async createRequest(createSupportDto: CreateSupportDto) {
    const { first_name, last_name, email, phone_number, postal_code } =
      createSupportDto;

    try {
      const request = this.createRepository.create({
        first_name,
        last_name,
        email,
        phone_number,
        postal_code,
      });

      const newRequest = this.createRepository.save(request);

      return {
        message: 'Send your Request',
        request: newRequest,
      };
    } catch {
      throw new BadRequestException('Failed to create Anniversary certificate');
    }
  }

  async findAll() {
    return await this.createRepository.find();
  }

  async findOne(id: number) {
    const request = await this.createRepository.findOneBy({ id });
    if (!request) {
      throw new BadRequestException(`Request with id ${id} not found`);
    }
    return request;
  }

  async remove(id: number) {
    const request = await this.createRepository.findOneBy({ id });
    if (!request) {
      throw new BadRequestException(`Request with id ${id} not found`);
    }
    await this.createRepository.remove(request);
    return request;
  }
}
