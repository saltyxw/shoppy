import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  SetMetadata,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext, GqlContextType } from "@nestjs/graphql";
import { UserPayload } from "../types/user.payload";

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    let request: Request;

    if (context.getType<GqlContextType>() === "graphql") {
      const ctx = GqlExecutionContext.create(context);
      request = ctx.getContext<{ req: Request }>().req;
    } else {
      request = context.switchToHttp().getRequest<Request>();
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException("No access token");
    }

    try {
      const payload = await this.jwtService.verifyAsync<UserPayload>(token, {
        secret: process.env.ACCESS_SECRET,
      });

      request["user"] = payload;
      return true;
    } catch {
      throw new UnauthorizedException("Invalid or expired access token");
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const auth = request.headers.authorization;
    if (!auth) return undefined;

    const [type, token] = auth.split(" ");
    return type === "Bearer" ? token : undefined;
  }
}
