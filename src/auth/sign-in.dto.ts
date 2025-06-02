import { Exclude } from 'class-transformer';
import { IsNotEmpty, Length } from 'class-validator';

class SignInDTO {
  @IsNotEmpty()
  @Length(5, 20)
  login: string;

  @IsNotEmpty()
  @Length(5, 20)
  @Exclude({ toPlainOnly: true })
  password: string;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }
}

export default SignInDTO;
