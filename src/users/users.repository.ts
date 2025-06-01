import UserRepository from './ports/users.repository';
import User from './users.entity';

class UsersRepositoryInMemory implements UserRepository {
  private readonly users: User[] = [];

  create(user: User): Promise<User> {
    this.users.push(user);

    return Promise.resolve(user);
  }
}

export default UsersRepositoryInMemory;
