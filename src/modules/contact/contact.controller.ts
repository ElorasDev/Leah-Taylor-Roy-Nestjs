import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { SendContactDto } from './dto/send-content.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  private readonly logger = new Logger(ContactController.name);

  constructor(
    private readonly contactService: ContactService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Send a contact message' })
  @ApiResponse({
    status: 201,
    description: 'The contact message has been successfully sent.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async submitContactForm(@Body() contactFormDto: SendContactDto) {
    this.logger.log(
      `Received contact form submission from: ${contactFormDto.email}`,
    );

    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');

    if (!adminEmail) {
      this.logger.error(
        'ADMIN_EMAIL is not configured in environment variables',
      );
      return {
        success: false,
        message: 'ADMIN_EMAIL is not configured in environment variables',
      };
    }

    const result = await this.contactService.sendContactFormEmail(
      contactFormDto,
      adminEmail,
    );

    if (result) {
      return {
        success: true,
        message: 'Your contact message has been successfully sent.',
      };
    } else {
      return {
        success: false,
        message:
          'sending email failed. Please try again later or contact support.',
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all contact messages' })
  @ApiResponse({ status: 200, description: 'Return all contact messages.' })
  async findAllMessage() {
    return this.contactService.findAllMessage();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':status')
  @ApiOperation({ summary: 'Get contact messages by status' })
  @ApiParam({
    name: 'status',
    required: true,
    description: 'Status of the contact messages',
  })
  @ApiResponse({
    status: 200,
    description: 'Return contact messages by status.',
  })
  @ApiResponse({ status: 404, description: 'Contact messages not found.' })
  async findOneMessage(@Param('status') status: string) {
    return this.contactService.findMessageByStatus(status);
  }

  @UseGuards(JwtAuthGuard)
  @Get('message/:id')
  @ApiOperation({ summary: 'Get a contact message by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the contact message',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the contact message by ID.',
  })
  @ApiResponse({ status: 404, description: 'Contact message not found.' })
  async findMessageById(@Param('id') id: number) {
    const message = await this.contactService.findMessageById(Number(id));
    if (message.status === 'unread') {
      await this.contactService.markAsRead(Number(id));
    }
    return message;
  }
}
