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

  async findOne(login: string, password: string): Promise<UserDTO | undefined> {
    const user = await this.userRepository.findOne(login, password);

    if (!user) return undefined;

    return UsersMapper.toUserDTO(user);
  }
}
