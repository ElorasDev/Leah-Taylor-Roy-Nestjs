import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('volunteer')
@Controller('volunteer')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new volunteer' })
  @ApiResponse({
    status: 201,
    description: 'The volunteer has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Validation failed.',
  })
  sendVolunteer(@Body() createVolunteerDto: CreateVolunteerDto) {
    return this.volunteerService.create(createVolunteerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Retrieve all volunteers' })
  @ApiResponse({
    status: 200,
    description: 'A list of volunteers has been successfully retrieved.',
  })
  findAll() {
    return this.volunteerService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a volunteer by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The ID of the volunteer to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'The volunteer details have been successfully retrieved.',
  })
  @ApiResponse({
    status: 404,
    description: 'Volunteer not found.',
  })
  findOne(@Param('id') id: string) {
    return this.volunteerService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a volunteer by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The ID of the volunteer to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The volunteer has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Volunteer not found.',
  })
  remove(@Param('id') id: string) {
    return this.volunteerService.remove(+id);
  }
}
