import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = this.extractTokenFromCookies(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: number;
        login: string;
      }>(token, {
        secret: 'secret',
      });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromCookies(request: Request): string | undefined {
    return (request.cookies['authToken'] as string) ?? undefined;
  }
}
