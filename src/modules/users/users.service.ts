import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from '../auth/dto/login.dto';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { hashPassword } from 'src/common/utils/crypto/passwordHash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly user_repository: Repository<User>,
  ) {}

  async findAll() {
    return await this.user_repository.find();
  }

  async findOne(loginDto: LoginDto) {
    return await this.user_repository.findOne({
      where: { username: loginDto.username },
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const { fullname, username, password, email } = createUserDto;
    const password_hash = await hashPassword(password);

    const newUser = this.user_repository.create({
      fullname,
      username,
      email,
      password_hash,
      account_status: 'active',
    });

    await this.user_repository.save(newUser);
    return newUser;
  }
}
