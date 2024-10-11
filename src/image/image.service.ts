import { Injectable } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { UploadImageDto } from './dto/uploadImage.dto';

@Injectable()
export class ImageService {
  constructor(private readonly s3Service: S3Service) {}

  async uploadImage(file: Express.Multer.File): Promise<UploadImageDto> {
    const uploadResult = await this.s3Service.uploadFile(file);

    return { imageUrl: uploadResult.Location };
  }

  async updateImage(
    file: Express.Multer.File,
    existingImageUrl: string
  ): Promise<UploadImageDto> {
    const existingFileKey = this.s3Service.removeBaseUrl(existingImageUrl);

    const updateResult = await this.s3Service.updateFile(file, existingFileKey);

    return { imageUrl: updateResult.Location };
  }

  async deleteImage(
    existingImageUrl: string
  ): Promise<AWS.S3.DeleteObjectOutput> {
    const existingFileKey = this.s3Service.removeBaseUrl(existingImageUrl);

    const deleteResult = await this.s3Service.deleteFile(existingFileKey);

    return deleteResult;
  }
}
