import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<Omit<User, 'dialogs'>> {
    const user = await this.userRepository.findOneBy({
      phone: loginUserDto.userPhone,
    });

    if (!user) {
      return this.createUser(loginUserDto.userPhone, loginUserDto.nickname);
    }

    if (user.nickname !== loginUserDto.nickname) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Invalid nickname',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const { dialogs, ...userWithoutDialogs } = user;

    return userWithoutDialogs;
  }
  async createUser(
    phone: string,
    nickname: string,
  ): Promise<Omit<User, 'dialogs'>> {
    const user = this.userRepository.create({ phone, nickname });

    await this.userRepository.save(user);
    return user;
  }
}
