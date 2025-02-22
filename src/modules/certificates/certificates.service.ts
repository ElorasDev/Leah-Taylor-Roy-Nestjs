import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificate } from './entities/certificates.entity';
import { BirthdayCardCertificate } from './entities/birthday_cards_certificate.entity';
import { AnniversaryCertificate } from './entities/anniversary_certificate.entity';
import { UniqueCertificate } from './entities/unique_certificate.entity';
import { PostBirthdayCardCertificateDto } from './dto/post-birthday-cards-certificate.dto';
import { PostAnniversaryCertificateDto } from './dto/post-anniversary-certificate.dto';
import { PostUniqueCertificateDto } from './dto/post-unique-certificate.dto';
import { PostBirthdayCertificateDto } from './dto/post-birthday-certificate.dto';
import { BirthdayCertificate } from './entities/birthday_certificate.entity';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(Certificate)
    private certificateRepository: Repository<Certificate>,
    @InjectRepository(BirthdayCardCertificate)
    private birthdayCardRepository: Repository<BirthdayCardCertificate>,
    @InjectRepository(AnniversaryCertificate)
    private anniversaryRepository: Repository<AnniversaryCertificate>,
    @InjectRepository(UniqueCertificate)
    private uniqueRepository: Repository<UniqueCertificate>,
    @InjectRepository(BirthdayCertificate)
    private birthdayCertificateRepository: Repository<BirthdayCertificate>,
  ) {}

  async createBirthdayCertificate(
    postBirthdayCertificateDto: PostBirthdayCertificateDto,
  ) {
    const {
      first_name,
      last_name,
      phone_number,
      select_certificate,
      recipient_first_name,
      recipient_last_name,
      email,
      recipient_address,
      recipient_birthday,
      postal_code,
      certificate_destination,
      additional_certificates,
      note,
    } = postBirthdayCertificateDto;

    try {
      const newCertificate = this.birthdayCertificateRepository.create({
        first_name,
        last_name,
        phone_number,
        select_certificate,
        recipient_first_name,
        recipient_last_name,
        email,
        recipient_address,
        recipient_birthday,
        postal_code,
        certificate_destination,
        additional_certificates,
        note,
      });
      const savedCertificate =
        await this.birthdayCertificateRepository.save(newCertificate);
      return {
        message: 'Birthday certificate created successfully',
        certificate: savedCertificate,
      };
    } catch {
      throw new BadRequestException('Failed to create birthday certificate');
    }
  }

  async createBirthdayCardCertificate(
    postBirthdayCardCertificateDto: PostBirthdayCardCertificateDto,
  ) {
    const {
      recipient_first_name,
      recipient_last_name,
      email,
      recipient_address,
      recipient_birthday,
      recipient_postal_code,
      is_for_self,
    } = postBirthdayCardCertificateDto;

    try {
      const newCertificate = this.birthdayCardRepository.create({
        recipient_first_name,
        recipient_last_name,
        email,
        recipient_address,
        recipient_birthday,
        recipient_postal_code,
        is_for_self,
      });
      const savedCertificate =
        await this.birthdayCardRepository.save(newCertificate);
      return {
        message: 'Birthday Card created successfully',
        certificate: savedCertificate,
      };
    } catch {
      throw new BadRequestException('Failed to create birthday card');
    }
  }

  async createAnniversaryCertificate(
    PostAnniversaryCertificateDto: PostAnniversaryCertificateDto,
  ) {
    const {
      first_name,
      last_name,
      phone_number,
      select_certificate,
      recipient1_first_name,
      recipient1_last_name,
      recipient2_first_name,
      recipient2_last_name,
      date_of_marriage,
      email,
      recipient_address,
      postal_code,
      certificate_destination,
      additional_certificates,
      note,
    } = PostAnniversaryCertificateDto;

    try {
      const newCertificate = this.anniversaryRepository.create({
        first_name,
        last_name,
        phone_number,
        select_certificate,
        recipient1_first_name,
        recipient1_last_name,
        recipient2_first_name,
        recipient2_last_name,
        email,
        recipient_address,
        date_of_marriage,
        postal_code,
        certificate_destination,
        additional_certificates,
        note,
      });
      const savedCertificate =
        await this.anniversaryRepository.save(newCertificate);
      return {
        message: 'Anniversary certificate created successfully',
        certificate: savedCertificate,
      };
    } catch {
      throw new BadRequestException('Failed to create Anniversary certificate');
    }
  }

  async createUniqueCertificate(
    postUniqueCertificateDto: PostUniqueCertificateDto,
  ) {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      certificate_description,
    } = postUniqueCertificateDto;

    try {
      const newCertificate = this.uniqueRepository.create({
        first_name,
        last_name,
        email,
        phone_number,
        certificate_description,
      });
      const savedCertificate = await this.uniqueRepository.save(newCertificate);
      return {
        message: 'Unique certificate created successfully',
        certificate: savedCertificate,
      };
    } catch {
      throw new BadRequestException('Failed to create Unique certificate');
    }
  }

  async findAll() {
    return await this.certificateRepository
      .createQueryBuilder('certificate')
      .select([
        'id',
        'email',
        "COALESCE(certificate.certificate_type, '') AS certificate_type",
        'first_name',
        'last_name',
        'phone_number',
        'certificate_description',
        'select_certificate',
        'recipient_first_name',
        'recipient_last_name',
        'recipient_email',
        'recipient_address',
        'postal_code',
        'recipient_birthday',
        'certificate_destination',
        'additional_certificates',
        'note',
        'recipient_postal_code',
        'is_for_self',
        'recipient1_first_name',
        'recipient1_last_name',
        'recipient2_first_name',
        'recipient2_last_name',
        'date_of_marriage',
      ])
      .getRawMany();
  }

  async findCertificatesByType(
    certificateType: string,
  ): Promise<Certificate[]> {
    return await this.certificateRepository
      .createQueryBuilder('certificate')
      .where('certificate.certificate_type = :certificateType', {
        certificateType,
      })
      .getMany();
  }

  async findOne(id: number) {
    const certificate = await this.certificateRepository.findOneBy({ id });
    if (!certificate) {
      throw new BadRequestException(`Certificate with id ${id} not found`);
    }
    return certificate;
  }

  async remove(id: number) {
    const certificate = await this.certificateRepository.findOneBy({ id });
    if (!certificate) {
      throw new BadRequestException(`Certificate with id ${id} not found`);
    }
    await this.certificateRepository.remove(certificate);
    return certificate;
  }
}
