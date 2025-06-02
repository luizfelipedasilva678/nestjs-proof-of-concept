import User from '../users.entity';

interface UserRepository {
  create(user: User): Promise<User>;
  findOne(login: string, password: string): Promise<User | undefined>;
}

export default UserRepository;
