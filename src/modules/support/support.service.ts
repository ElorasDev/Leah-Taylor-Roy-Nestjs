import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSupportDto } from './dto/create-support.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Support } from './entities/support.entity';

@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(Support)
    private requestRepository: Repository<Support>,
  ) {}
  async createRequest(createSupportDto: CreateSupportDto) {
    const { first_name, last_name, email, phone_number, postal_code } =
      createSupportDto;

    try {
      const request = this.requestRepository.create({
        first_name,
        last_name,
        email,
        phone_number,
        postal_code,
      });

      const newRequest = this.requestRepository.save(request);

      return {
        message: 'Send your Request',
        request: newRequest,
      };
    } catch {
      throw new BadRequestException('Failed to create Request');
    }
  }

  async findAll() {
    return await this.requestRepository.find();
  }

  async findOne(id: number) {
    const request = await this.requestRepository.findOneBy({ id });
    if (!request) {
      throw new BadRequestException(`Request with id ${id} not found`);
    }
    return request;
  }

  async remove(id: number) {
    const request = await this.requestRepository.findOneBy({ id });
    if (!request) {
      throw new BadRequestException(`Request with id ${id} not found`);
    }
    await this.requestRepository.remove(request);
    return request;
  }
}
