import {
  Controller,
  Req,
  UseGuards,
  Patch,
  Body,
  Delete,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UpdateUserProfileDto } from './dto/updateUserProfile.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getUserProfile(@Req() req) {
    const userId = req.user.id;
    const user = await this.usersService.findOneById(userId);

    const userProfile = user.toObject();
    delete userProfile.password;

    return userProfile;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('me')
  async updateUserProfile(
    @Req() req,
    @Body() updateUserProfileDto: UpdateUserProfileDto
  ) {
    const userId = req.user.id;
    return this.usersService.updateProfile(userId, updateUserProfileDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('me')
  async deleteUserAccount(@Req() req) {
    const userId = req.user.id;
    return await this.usersService.deleteAccount(userId);
  }
}
