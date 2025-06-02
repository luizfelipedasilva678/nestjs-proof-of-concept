import UserRepository from './ports/users.repository';
import User from './users.entity';

class UsersRepositoryInMemory implements UserRepository {
  private readonly users: User[] = [];

  create(user: User): Promise<User> {
    user.id = this.users.length + 1;
    this.users.push(user);

    return Promise.resolve(user);
  }

  findOne(login: string, password: string): Promise<User | undefined> {
    return Promise.resolve(
      this.users.find(
        (user) => user.login === login && user.password === password,
      ),
    );
  }
}

export default UsersRepositoryInMemory;
