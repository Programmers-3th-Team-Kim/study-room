import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PlannersService } from './planners.service';
import { Planner } from './planners.schema';
import { PlannerDto } from './dto/planner.dto';
// import { Types } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

@Controller('planners')
export class PlannersController {
  constructor(private readonly plannersService: PlannersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Req() req: any,
    @Body() createPlanDto: PlannerDto
  ): Promise<any> {
    const userId = req.user._id;
    return this.plannersService.createPlan(userId, createPlanDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(
    @Req() req: any,
    @Query('date') date: string
  ): Promise<Planner[]> {
    const userId = req.user._id;
    console.log(userId);
    return this.plannersService.showAll(userId, date);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':plannerId')
  async update(
    @Req() req: any,
    @Param('plannerId') plannerId: string,
    @Body() plannerDto: PlannerDto
  ): Promise<any> {
    const userId = req.user._id;
    const { isContinuous, ...updatePlannerDto } = plannerDto;

    if (isContinuous) {
      // 연속 수정
      return this.plannersService.updatePlanCascade(
        userId,
        plannerId,
        updatePlannerDto
      );
    } else {
      // 단일 수정
      return this.plannersService.updatePlan(
        userId,
        plannerId,
        updatePlannerDto
      );
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':plannerId')
  async delete(
    @Req() req: any,
    @Param('plannerId') plannerId: string,
    @Query('isContinuous') isContinuous: boolean
  ): Promise<Planner> {
    const userId = req.user._id;
    if (isContinuous) {
      // 연속 삭제
      return this.plannersService.deletePlanCascade(userId, plannerId);
    } else {
      // 단일 삭제
      return this.plannersService.deletePlan(userId, plannerId);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('completed/:plannerId')
  async toggle(
    @Req() req: any,
    @Param('plannerId') plannerId: string
  ): Promise<Planner> {
    const userId = req.user._id;
    return this.plannersService.toggleIsComplete(userId, plannerId);
  }
}
