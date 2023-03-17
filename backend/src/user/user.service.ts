import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Like, Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user-dto';
import { userToDialogInfo } from '../utils/userToDialogInfo';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<Omit<User, 'dialogs'>> {
    const user = await this.userRepository.findOneBy({
      phoneNumber: loginUserDto.userPhone,
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
    phoneNumber: string,
    nickname: string,
  ): Promise<Omit<User, 'dialogs'>> {
    const user = this.userRepository.create({ phoneNumber, nickname });

    await this.userRepository.save(user);
    return user;
  }
  async getByText(value: string, phoneNumber: string) {
    const allUsers = (
      await this.userRepository.findBy({
        nickname: Like(`%${value}%`),
      })
    ).filter((user) => user.phoneNumber !== phoneNumber);
    const user = await this.userRepository.findOneBy({ phoneNumber });
    const partnersPhone =
      user.dialogInfo?.map((partner) => partner.partnerPhone) || [];

    return {
      userDialogs:
        user.dialogInfo?.filter((partner) =>
          partner.partnerPhone.includes(value),
        ) || [],
      globalDialogs:
        allUsers
          ?.filter((user) => !partnersPhone.includes(user.phoneNumber))
          ?.map((user) => userToDialogInfo(user)) || [],
    };
  }
}
