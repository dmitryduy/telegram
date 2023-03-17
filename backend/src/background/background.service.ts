import { Injectable } from '@nestjs/common';

@Injectable()
export class BackgroundService {
  getAll() {
    return [
      'coffee.webp',
      'default.webp',
      'desert.webp',
      'fog.webp',
      'mountain.webp',
      'pendulum.webp',
      'sea-star.webp',
      'sky.webp',
    ];
  }
}
