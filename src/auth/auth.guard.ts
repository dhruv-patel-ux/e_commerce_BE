import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { verify, JwtPayload } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

const JWT_SECRET = process.env.JWT_SECRET || '00E-COMMERCE$$';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UsersService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = verify(token, JWT_SECRET) as JwtPayload & { id: string };

      const user = await this.userService.findOne(+payload.id);
      if (!user.data) {
        throw new UnauthorizedException('User not found');
      }

      request.user = user.data;
      return true;
    } catch (error) {
      console.error('AuthGuard Error:', error.message);
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}