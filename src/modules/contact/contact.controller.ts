import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ContactService } from './contact.service';
import { SendContactDto } from './dto/send-content.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Send a contact message' })
  @ApiResponse({
    status: 201,
    description: 'The contact message has been successfully sent.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async sendContent(@Body() createContactDto: SendContactDto) {
    return this.contactService.sendContent(createContactDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all contact messages' })
  @ApiResponse({ status: 200, description: 'Return all contact messages.' })
  async findAllMessage() {
    return this.contactService.findAllMessage();
  }

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
    return this.contactService.findOneMessage(status);
  }
}
