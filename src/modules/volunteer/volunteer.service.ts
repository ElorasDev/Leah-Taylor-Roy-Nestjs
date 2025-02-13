import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { Volunteer } from './entities/volunteer.entity';

@Injectable()
export class VolunteerService {
  constructor(
    @InjectRepository(Volunteer)
    private readonly volunteerRepository: Repository<Volunteer>,
  ) {}

  async create(createVolunteerDto: CreateVolunteerDto) {
    const { first_name, last_name, phone_number, postal_code, email } =
      createVolunteerDto;

    try {
      const volunteer = this.volunteerRepository.create({
        first_name,
        last_name,
        email,
        phone_number,
        postal_code,
      });

      const newVolunteer = this.volunteerRepository.save(volunteer);

      return {
        message: 'Send your Volunteer Request',
        request: newVolunteer,
      };
    } catch {
      throw new BadRequestException('Failed to volunteer Request');
    }
  }

  async findAll() {
    return await this.volunteerRepository.find();
  }

  async findOne(id: number) {
    const volunteer = await this.volunteerRepository.findOneBy({ id });
    if (!volunteer) {
      throw new BadRequestException(`Volunteer with id ${id} not found`);
    }
    return volunteer;
  }

  async remove(id: number) {
    const volunteer = await this.volunteerRepository.findOneBy({ id });
    if (!volunteer) {
      throw new BadRequestException(`Volunteer with id ${id} not found`);
    }
    await this.volunteerRepository.remove(volunteer);
    return volunteer;
  }
}
