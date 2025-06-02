import { AuthService } from './auth.service';
import SignInDTO from './sign-in.dto';
import { Response, Request } from 'express';
import { Body, Controller, Post, Res, Req, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(
    @Body() signInDto: SignInDTO,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (request.cookies['authToken']) {
      response.redirect('/');
      return;
    }

    const { access_token } = await this.authService.signIn(
      signInDto.login,
      signInDto.password,
    );

    response.cookie('authToken', access_token, {
      httpOnly: true,
      secure: true,
    });

    response.status(200);
  }

  @Get('logout')
  logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!request.cookies['authToken']) {
      response.redirect('/');
      return;
    }

    response.clearCookie('authToken');
  }
}
