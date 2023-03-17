import { Module } from '@nestjs/common';
import { BackgroundService } from './background.service';
import { BackgroundController } from './background.controller';

@Module({
  providers: [BackgroundService],
  controllers: [BackgroundController],
})
export class BackgroundModule {}
