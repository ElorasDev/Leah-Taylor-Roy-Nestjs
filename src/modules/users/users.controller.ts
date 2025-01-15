import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
