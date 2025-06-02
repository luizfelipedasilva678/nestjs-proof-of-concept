import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    login: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(login, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, login: user.login };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
