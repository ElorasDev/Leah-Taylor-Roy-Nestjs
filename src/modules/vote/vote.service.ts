import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Vote } from './entities/vote.entity';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
  ) {}
  async createVote(createVoteDto: CreateVoteDto) {
    const { first_name, last_name, email, postal_code } = createVoteDto;

    try {
      const vote = this.voteRepository.create({
        first_name,
        last_name,
        email,
        postal_code,
      });

      const newVote = this.voteRepository.save(vote);

      return {
        message: 'Send your Vote',
        request: newVote,
      };
    } catch {
      throw new BadRequestException('Failed to create Vote');
    }
  }

  async findAll() {
    return await this.voteRepository.find();
  }

  async findOne(id: number) {
    const vote = await this.voteRepository.findOneBy({ id });
    if (!vote) {
      throw new BadRequestException(`Vote with id ${id} not found`);
    }
    return vote;
  }

  async remove(id: number) {
    const vote = await this.voteRepository.findOneBy({ id });
    if (!vote) {
      throw new BadRequestException(`Vote with id ${id} not found`);
    }
    await this.voteRepository.remove(vote);
    return vote;
  }
}
