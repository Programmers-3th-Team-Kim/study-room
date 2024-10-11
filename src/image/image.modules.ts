import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { S3Service } from '../s3/s3.service';

@Module({
  controllers: [ImageController],
  providers: [ImageService, S3Service],
})
export class ImageModule {}
