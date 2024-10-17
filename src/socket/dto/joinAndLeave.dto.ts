import {
  ArrayMaxSize,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { SPlannerDto } from './planner.dto';

export class RoomAndMyInfoDto {
  title: string;
  notice: string;
  tagList: string[];
  maxNum: number;
  isPublic: boolean;
  isChat: boolean;
  imageUrl: string;
  password: string;
  roomManager: string;
  currentMember: string[];
  planner: SPlannerDto[];
  totalTime: number;
}

export class ResponseUserInfoDto {
  totalTime: number;
  state: 'start' | 'stop';
  socketId: string;
}

export class NoticeDto {
  message: string;
  time: string;
}

export class ModifyRoomDto {
  @IsOptional()
  @IsString({ message: '방 제목은 문자열이어야 합니다.' })
  @MaxLength(30, { message: '최대 30자까지 입력할 수 있습니다.' })
  title: string;

  @IsOptional()
  @IsString({ each: true, message: '태그는 문자열 배열이어야 합니다.' })
  @ArrayMaxSize(7, { message: '태그는 최대 7개까지만 가능합니다.' })
  @MaxLength(10, {
    each: true,
    message: '태그는 최대 10글자까지 입력 가능합니다.',
  })
  tagList: string[];

  @IsOptional()
  @IsString({ message: '공지사항은 문자열이어야 합니다.' })
  notice: string;

  @IsNotEmpty({ message: '공개 여부는 필수입니다.' })
  @IsBoolean({ message: '공개 여부는 true 또는 false 값이어야 합니다.' })
  isPublic: boolean;

  @ValidateIf((o) => o.isPublic === false)
  @IsNotEmpty({
    message: '비밀번호는 공개 여부가 false일 때 반드시 입력되어야 합니다.',
  })
  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  @MinLength(1, { message: '비밀번호는 최소 1자 이상이어야 합니다.' })
  password: string;

  @IsNotEmpty({ message: '채팅 여부는 필수입니다.' })
  @IsBoolean({ message: '채팅 여부는 true 또는 false 값이어야 합니다.' })
  isChat: boolean;

  @IsOptional()
  @IsString({ message: '이미지 URL은 문자열이어야 합니다.' })
  imageUrl: string;
}

export class ResponseRoomDto {
  title: string;
  notice: string;
  tagList: string[];
  maxNum: number;
  isPublic: boolean;
  isChat: boolean;
  imageUrl: string;
  password: string;
  roomManager: string;
}
