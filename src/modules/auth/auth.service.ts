import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  
  login(loginDto: LoginDto) {
    return `This login section for user: ${loginDto.username}`;
  }
}
