import { IsNotEmpty, IsNumber, Length } from 'class-validator';
import { Exclude } from 'class-transformer';

export default class UserDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @Length(5, 20)
  login: string;

  @IsNotEmpty()
  @Length(5)
  name: string;

  @IsNotEmpty()
  @Length(5)
  @Exclude({ toPlainOnly: true })
  password: string;

  constructor(login: string, name: string, password: string, id: number = 0) {
    this.id = id;
    this.login = login;
    this.name = name;
    this.password = password;
  }
}
