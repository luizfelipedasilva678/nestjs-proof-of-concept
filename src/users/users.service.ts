import { Inject, Injectable } from '@nestjs/common';
import UserRepository from './ports/users.repository';
import User from './users.entity';
import { connect } from 'amqplib';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async create(user: User): Promise<User> {
    const createdUser = await this.userRepository.create(user);

    const connection = await connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange('notifications', 'fanout', { durable: false });

    channel.publish(
      'notifications',
      '',
      Buffer.from(
        JSON.stringify({
          login: createdUser.login,
          name: createdUser.name,
        }),
      ),
    );

    setTimeout(() => {
      connection
        .close()
        .then(() => {})
        .catch(() => {});
    }, 500);

    return createdUser;
  }

  async findOne(login: string, password: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne(login, password);

    if (!user) return undefined;

    return user;
  }
}
