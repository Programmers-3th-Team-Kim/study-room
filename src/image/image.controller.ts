import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { UploadImageDto } from './dto/uploadImage.dto';
import { AuthGuard } from '@nestjs/passport';
import { S3Service } from 'src/s3/s3.service';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: S3Service.prototype.getMulterOptions().fileFilter,
    })
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File
  ): Promise<UploadImageDto> {
    return this.imageService.uploadImage(file);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: S3Service.prototype.getMulterOptions().fileFilter,
    })
  )
  async updateImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('imageUrl') imageUrl: string
  ): Promise<UploadImageDto> {
    const result = await this.imageService.updateImage(file, imageUrl);
    return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteImage(@Body('imageUrl') imageUrl: string) {
    const result = await this.imageService.deleteImage(imageUrl);
    return result;
  }
}
