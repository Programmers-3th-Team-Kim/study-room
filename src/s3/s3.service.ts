import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as AWS from 'aws-sdk';
import { extname } from 'path';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor(private configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY'),
      region: this.configService.get<string>('AWS_REGION'),
    });
  }

  getMulterOptions(): MulterOptions {
    return {
      fileFilter: (req, file, callback) => {
        const validExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
        const validMimeTypes = [
          'image/png',
          'image/jpg',
          'image/jpeg',
          'image/gif',
        ];

        const fileExt = extname(file.originalname).toLowerCase();
        const mimeType = file.mimetype;

        if (
          !validExtensions.includes(fileExt) ||
          !validMimeTypes.includes(mimeType)
        ) {
          return callback(new BadRequestException('Invalid file type'), false);
        }
        callback(null, true);
      },
    };
  }

  async uploadFile(
    file: Express.Multer.File
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    const params = {
      Bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
      Key: uuidV4(),
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const uploadResult = await this.s3.upload(params).promise();
    return uploadResult;
  }

  async updateFile(
    file: Express.Multer.File,
    existingFileKey: string
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    const params = {
      Bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
      Key: existingFileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const uploadResult = await this.s3.upload(params).promise();
    return uploadResult;
  }

  async deleteFile(fileKey: string): Promise<AWS.S3.DeleteObjectOutput> {
    const params = {
      Bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
      Key: fileKey,
    };

    const deleteResult = await this.s3.deleteObject(params).promise();

    return deleteResult;
  }

  removeBaseUrl(url: string): string {
    const baseUrl = this.configService.get<string>('AWS_BASE_URL');
    return url.replace(baseUrl, '');
  }
}
