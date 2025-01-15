import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { SendContactDto } from './dto/send-content.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contact_repository: Repository<Contact>,
  ) {}

  async sendContent(sendContactDto: SendContactDto) {
    const { fullname, email, phone_number, content } = sendContactDto;

    const sendContent = this.contact_repository.create({
      fullname,
      email,
      phone_number,
      content,
    });

    await this.contact_repository.save(sendContent);
    return sendContent;
  }

  async findAllMessage() {
    return this.contact_repository.find();
  }

  async findMessageByStatus(status: string) {
    const query = this.contact_repository.createQueryBuilder('contact');
    query.where('contact.status = :status', { status });
    return await query.getMany();
  }

  async findMessageById(id: number): Promise<Contact> {
    const message = await this.contact_repository.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException(`Contact message with ID ${id} not found`);
    }
    return message;
  }

  async markAsRead(id: number): Promise<Contact> {
    const message = await this.findMessageById(id);
    if (message.status === 'unread') {
      message.status = 'read';
      await this.contact_repository.save(message);
    }
    return message;
  }
}
