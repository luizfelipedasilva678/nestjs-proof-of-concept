import UserDTO from './users.dto';
import User from './users.entity';

class UsersMapper {
  public static toUserDTO(user: User): UserDTO {
    return new UserDTO(user.login, user.name, user.password, user.id);
  }

  public static toUser(userDTO: UserDTO): User {
    return new User(userDTO.login, userDTO.name, userDTO.password, userDTO.id);
  }
}

export default UsersMapper;
