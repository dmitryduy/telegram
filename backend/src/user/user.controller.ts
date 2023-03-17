import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user-dto';
import { UserService } from './user.service';
import { QueryGetByText } from './dto/query-get-by-text';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
  @Get('users')
  getByText(@Query() query: QueryGetByText) {
    return this.userService.getByText(query.value, query.userPhone);
  }
}
