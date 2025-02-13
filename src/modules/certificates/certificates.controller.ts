import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { PostBirthdayCardCertificateDto } from './dto/post-birthday-cards-certificate.dto';
import { PostAnniversaryCertificateDto } from './dto/post-anniversary-certificate.dto';
import { PostUniqueCertificateDto } from './dto/post-unique-certificate.dto';
import { PostBirthdayCertificateDto } from './dto/post-birthday-certificate.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Certificates')
@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Post('/birthday')
  @ApiOperation({ summary: 'Create a birthday certificate' })
  @ApiResponse({
    status: 201,
    description: 'Birthday certificate created successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async postBirthdayCertificate(
    @Body() createBirthdayCertificateDto: PostBirthdayCertificateDto,
  ) {
    try {
      return this.certificatesService.createBirthdayCertificate(
        createBirthdayCertificateDto,
      );
    } catch (error) {
      throw { message: 'Internal Server Error', error: error.message };
    }
  }

  @Post('/birthday-card')
  @ApiOperation({ summary: 'Create a birthday card certificate' })
  @ApiResponse({
    status: 201,
    description: 'Birthday card certificate created successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async postBirthdayCardsCertificate(
    @Body() createBirthdayCardCertificate: PostBirthdayCardCertificateDto,
  ) {
    try {
      return this.certificatesService.createBirthdayCardCertificate(
        createBirthdayCardCertificate,
      );
    } catch (error) {
      throw { message: 'Internal Server Error', error: error.message };
    }
  }

  @Post('/anniversary')
  @ApiOperation({ summary: 'Create an anniversary certificate' })
  @ApiResponse({
    status: 201,
    description: 'Anniversary certificate created successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async postAnniversaryCertificate(
    @Body() createAnniversaryCertificateDto: PostAnniversaryCertificateDto,
  ) {
    try {
      return this.certificatesService.createAnniversaryCertificate(
        createAnniversaryCertificateDto,
      );
    } catch (error) {
      throw { message: 'Internal Server Error', error: error.message };
    }
  }

  @Post('/unique')
  @ApiOperation({ summary: 'Create a unique certificate' })
  @ApiResponse({
    status: 201,
    description: 'Unique certificate created successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async postUniqueCertificate(
    @Body() createUniqueCertificateDto: PostUniqueCertificateDto,
  ) {
    try {
      return this.certificatesService.createUniqueCertificate(
        createUniqueCertificateDto,
      );
    } catch (error) {
      throw { message: 'Internal Server Error', error: error.message };
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all certificates' })
  @ApiResponse({ status: 200, description: 'List of all certificates' })
  async findAll() {
    return this.certificatesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a certificate by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Certificate ID' })
  @ApiResponse({ status: 200, description: 'Certificate found' })
  @ApiResponse({ status: 404, description: 'Certificate not found' })
  findOne(@Param('id') id: string) {
    return this.certificatesService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a certificate by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Certificate ID' })
  @ApiResponse({ status: 200, description: 'Certificate deleted successfully' })
  @ApiResponse({ status: 404, description: 'Certificate not found' })
  remove(@Param('id') id: string) {
    return this.certificatesService.remove(+id);
  }
}
