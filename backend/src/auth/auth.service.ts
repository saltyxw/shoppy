import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async signUp(data: CreateUserDto) {
    const existingUser = await this.userRepo.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new BadRequestException("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await this.userRepo.save(
      this.userRepo.create({
        fullname: data.fullname,
        email: data.email,
        password: hashedPassword,
      })
    );

    return this.generateTokens(newUser);
  }

  async signIn(email: string, password: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      select: ["id", "fullname", "email", "password", "role"],
    });

    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password");
    }

    return this.generateTokens(user);
  }

  private async generateTokens(user: User) {
    const payload = {
      sub: user.id,
      username: user.fullname,
      role: user.role,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_SECRET,
      expiresIn: "15m",
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: "15d",
    });

    return { access_token, refresh_token };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_SECRET,
      });

      const user = await this.userRepo.findOne({
        where: { id: payload.sub },
      });

      if (!user) throw new UnauthorizedException();

      const access_token = await this.jwtService.signAsync(
        {
          sub: user.id,
          role: user.role,
        },
        {
          secret: process.env.ACCESS_SECRET,
          expiresIn: "15m",
        }
      );

      return { access_token };
    } catch {
      throw new UnauthorizedException();
    }
  }

  async clearRefreshToken(userId: number) {
    await this.userRepo.update(userId, {
      refreshToken: "",
    });
  }
}
