import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Planner, PlannerSchema } from 'src/planners/planners.schema';
import { Room, RoomSchema } from 'src/rooms/rooms.schema';
import { User, UserSchema } from 'src/users/users.schema';
import { Statistic, StatisticSchema } from 'src/statistics/statistics.schema';
// import { SocketJwtAuthService } from 'src/auth/socketJwtAuth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: User.name, schema: UserSchema },
      { name: Planner.name, schema: PlannerSchema },
      { name: Statistic.name, schema: StatisticSchema },
    ]),
    // SocketJwtAuthService,
  ],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
