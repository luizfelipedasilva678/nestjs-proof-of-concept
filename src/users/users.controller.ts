import UserDTO from './users.dto';
import UsersMapper from './users.mapper';
import { UsersService } from './users.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDTO: UserDTO) {
    return UsersMapper.toUserDTO(
      await this.usersService.create(UsersMapper.toUser(createUserDTO)),
    );
  }
}
