import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user-dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
}
