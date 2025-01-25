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
      keyPrefix: 'login_fail',
    });
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.auth_repository.findOne({
      where: { username },
      select: [
        'id',
        'username',
        'email',
        'password_hash',
        'account_status',
        'failed_attempts',
      ],
    });

    if (!user || user.account_status === 'locked') {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await comparePassword(password, user.password_hash);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      user.failed_attempts = Number(user.failed_attempts) + 1;
      await this.auth_repository.save(user);
      try {
        await this.loginRateLimiter.consume(username);
      } catch {
        user.account_status = 'locked';
        await this.auth_repository.save(user);
        throw new UnauthorizedException('Invalid credentials.');
      }
      throw new UnauthorizedException('Invalid credentials');
    }

    user.failed_attempts = 0;
    await this.auth_repository.save(user);
    await this.loginRateLimiter.delete(username);

    const payload = { email: user.email, sub: user.id };

    const token = this.jwtService.sign(payload, {
      expiresIn: '2d',
    });

    return { token };
  }
}
