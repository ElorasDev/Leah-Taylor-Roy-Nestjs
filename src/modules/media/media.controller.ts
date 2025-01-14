import {
  Controller,
  Get,
  Param,
  // Post,
  // Body,
  Query,
  // UseInterceptors,
  // UploadedFile,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MediaService } from './media.service';
// import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // we dont need to Post method
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body('user') user: User,
  // ) {
  //   return this.mediaService.createMedia(file, user);
  // }

  @Get()
  @ApiOperation({ summary: 'Get all media' })
  @ApiQuery({
    name: 'fileType',
    required: false,
    description: 'Filter by file type',
  })
  @ApiResponse({ status: 200, description: 'Return all media.' })
  async findAllMedia(@Query('fileType') fileType?: string) {
    return this.mediaService.findAllMedia(fileType);
  }

  @Get('published')
  @ApiOperation({ summary: 'Get all published media' })
  @ApiQuery({
    name: 'fileType',
    required: false,
    description: 'Filter by file type',
  })
  @ApiResponse({ status: 200, description: 'Return all published media.' })
  async findAllPublishedMedia(@Query('fileType') fileType?: string) {
    return this.mediaService.findAllPublishedMedia(fileType);
  }

  @Get('published/:id')
  @ApiOperation({ summary: 'Get published media by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the media' })
  @ApiResponse({ status: 200, description: 'Return published media by ID.' })
  @ApiResponse({ status: 404, description: 'Published media not found.' })
  async findOnePublishedMedia(@Param('id') id: number) {
    return this.mediaService.findOnePublishedMedia(id);
  }
}
