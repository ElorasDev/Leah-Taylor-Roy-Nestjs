import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { Certificate } from './entities/certificates.entity';
import { AnniversaryCertificate } from './entities/anniversary_certificate.entity';
import { BirthdayCardCertificate } from './entities/birthday_cards_certificate.entity';
import { BirthdayCertificate } from './entities/birthday_certificate.entity';
import { UniqueCertificate } from './entities/unique_certificate.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Certificate,
      AnniversaryCertificate,
      BirthdayCardCertificate,
      BirthdayCertificate,
      UniqueCertificate,
    ]),
  ],
  controllers: [CertificatesController],
  providers: [CertificatesService],
})
export class CertificatesModule {}
