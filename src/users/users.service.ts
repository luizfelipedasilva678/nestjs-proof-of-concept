import { Inject, Injectable } from '@nestjs/common';
import UserRepository from './ports/users.repository';
import UserDTO from './users.dto';
import UsersMapper from './users.mapper';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async create(userDTO: UserDTO): Promise<UserDTO> {
    return UsersMapper.toUserDTO(
      await this.userRepository.create(UsersMapper.toUser(userDTO)),
    );
  }
}
