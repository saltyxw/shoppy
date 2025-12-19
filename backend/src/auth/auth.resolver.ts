import { Resolver, Mutation, Args, Context } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { CreateUserInput } from "src/users/inputs/create-user.input";
import { AuthResponse } from "./auth.types";
import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { Public } from "./guards/auth.guard";
import { CurrentUser } from "./decorators/current-user.decorator";
import { AuthGuard } from "./guards/auth.guard";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => AuthResponse)
  async register(@Args("data") data: CreateUserInput, @Context() ctx: any) {
    const { access_token, refresh_token } = await this.authService.signUp(data);

    ctx.res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return { access_token };
  }

  @Public()
  @Mutation(() => AuthResponse)
  async login(
    @Args("email") email: string,
    @Args("password") password: string,
    @Context() ctx: any
  ) {
    const { access_token, refresh_token } = await this.authService.signIn(
      email,
      password
    );

    ctx.res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return { access_token };
  }

  @Mutation(() => AuthResponse)
  async updateAccessToken(@Context() ctx: any) {
    const refreshToken = ctx.req.cookies?.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException(" no cookie provided");
    }

    return this.authService.refreshAccessToken(refreshToken);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async logout(@CurrentUser() user: any, @Context() ctx: any) {
    await this.authService.clearRefreshToken(user.sub);

    ctx.res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return true;
  }
}
