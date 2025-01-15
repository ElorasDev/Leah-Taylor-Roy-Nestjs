import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../auth/dto/login.dto';
import { User } from '../users/entities/user.entity';
import { comparePassword } from 'src/common/utils/crypto/passwordHash';

@Injectable()
export class AuthService {
  private readonly loginRateLimiter: RateLimiterMemory;

  constructor(
    @InjectRepository(User)
    private readonly auth_repository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {
    this.loginRateLimiter = new RateLimiterMemory({
      points: 5,
      duration: 900,
    });
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.auth_repository.findOne({
      where: { username },
      select: ['id', 'username', 'email', 'password_hash', 'account_status'],
    });
    if (!user || user.account_status === 'locked') {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      try {
        await this.loginRateLimiter.consume(username);
      } catch (rejRes) {
        user.account_status = 'locked';
        await this.auth_repository.save(user);
        throw new UnauthorizedException(
          'Your account is temporarily unavailable.',
        );
      }
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.loginRateLimiter.delete(username);

    const payload = { email: user.email, sub: user.id };

    const token = this.jwtService.sign(payload, {
      expiresIn: '2d',
    });

    return { token };
  }
}
