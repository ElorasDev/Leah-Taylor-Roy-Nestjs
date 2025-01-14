import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { SendContactDto } from './dto/send-content.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly content_repository: Repository<Contact>,
  ) {}

  async sendContent(sendContactDto: SendContactDto) {
    const { fullname, email, phone_number, content } = sendContactDto;

    const sendContent = this.content_repository.create({
      fullname,
      email,
      phone_number,
      content,
    });

    await this.content_repository.save(sendContent);
    return sendContent;
  }

  async findAllMessage() {
    return this.content_repository.find();
  }

  async findOneMessage(status: string) {
    const query = this.content_repository.createQueryBuilder('contact');
    query.where('contact.status = :status', { status });
    return await query.getMany();
  }
}
