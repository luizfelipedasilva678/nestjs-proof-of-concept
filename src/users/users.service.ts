import { Inject, Injectable } from '@nestjs/common';
import UserRepository from './ports/users.repository';
import User from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async create(user: User): Promise<User> {
    return await this.userRepository.create(user);
  }

  async findOne(login: string, password: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne(login, password);

    if (!user) return undefined;

    return user;
  }
}
