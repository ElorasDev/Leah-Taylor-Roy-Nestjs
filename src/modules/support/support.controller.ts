import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SupportService } from './support.service';
import { CreateSupportDto } from './dto/create-support.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('support')
@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new support request' })
  @ApiResponse({
    status: 201,
    description: 'The support request has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Validation failed.',
  })
  sendRequest(@Body() createSupportDto: CreateSupportDto) {
    return this.supportService.createRequest(createSupportDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Retrieve all support requests' })
  @ApiResponse({
    status: 200,
    description: 'List of all support requests.',
  })
  findAll() {
    return this.supportService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific support request by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID of the support request',
  })
  @ApiResponse({
    status: 200,
    description: 'The support request has been found.',
  })
  @ApiResponse({
    status: 404,
    description: 'Support request not found.',
  })
  findOne(@Param('id') id: string) {
    return this.supportService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific support request by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID of the support request to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The support request has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Support request not found.',
  })
  remove(@Param('id') id: string) {
    return this.supportService.remove(+id);
  }
}
