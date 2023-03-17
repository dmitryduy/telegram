import { Controller, Get } from '@nestjs/common';
import { BackgroundService } from './background.service';

@Controller('/backgrounds')
export class BackgroundController {
  constructor(private backgroundService: BackgroundService) {}
  @Get()
  getAll() {
    return this.backgroundService.getAll();
  }
}
