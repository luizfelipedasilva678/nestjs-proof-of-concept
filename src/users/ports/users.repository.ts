import User from '../users.entity';

interface UserRepository {
  create(user: User): Promise<User>;
}

export default UserRepository;
