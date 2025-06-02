import { Knex } from 'knex';
import UserRepository from './ports/users.repository';
import User from './users.entity';
import { Inject } from '@nestjs/common';

class UserRepositoryInRDB implements UserRepository {
  constructor(@Inject('CONNECTION') private readonly connection: Knex) {}

  async create(user: User): Promise<User> {
    const result = await this.connection('users').insert({
      login: user.login,
      name: user.name,
      password: user.password,
    });

    user.id = result[0];

    return user;
  }

  async findOne(login: string, password: string): Promise<User | undefined> {
    const data = await this.connection('users').where(
      this.connection.raw('login = ? AND password = ?', [login, password]),
    );

    const user = data[0] as {
      id: number;
      login: string;
      name: string;
      password: string;
    };

    return new User(user.login, user.name, user.password, user.id);
  }
}

export default UserRepositoryInRDB;
