import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { SendContactDto } from './dto/send-content.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    @InjectRepository(Contact)
    private readonly contact_repository: Repository<Contact>,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendContactFormEmail(
    contactForm: SendContactDto,
    recipient: string,
  ): Promise<boolean> {
    try {
      this.logger.log(
        `Sending email to ${recipient} with data from ${contactForm.email} and email_user is ${process.env.EMAIL_USER}`,
      );

      await this.mailerService.sendMail({
        to: recipient,
        subject: 'New Contact Form Submission',
        template: 'contact.html',
        context: {
          fullname: contactForm.fullname,
          email: contactForm.email,
          phone_number: contactForm.phone_number || 'Not provided',
          message: contactForm.content,
        },
        headers: {
          Importance: 'Normal',
          'X-Priority': '3',
          'X-MSMail-Priority': 'Normal',
          Precedence: 'Bulk',
        },
        priority: 'normal',
      });

      this.logger.log('Email sent successfully');
      return true;
    } catch (error) {
      this.logger.error(`Error sending email: ${error.message}`, error.stack);
      return false;
    }
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
