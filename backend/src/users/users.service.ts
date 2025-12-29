import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import * as bcrypt from "bcrypt";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async updateProfile(id: number, updateUserInput: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException("User not found");

    const updateData: Partial<User> = {};

    if (updateUserInput.fullname) {
      updateData.fullname = updateUserInput.fullname;
    }

    if (Object.keys(updateData).length === 0) {
      return user;
    }

    await this.userRepo.update(id, updateData);

    return this.userRepo.findOne({ where: { id } });
  }

  async changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string
  ) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      select: ["id", "password"],
    });

    if (!user) throw new NotFoundException("User not found");

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException("Current password is incorrect");
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await this.userRepo.update(userId, {
      password: hashed,
    });

    return true;
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException("User not found");
    await this.userRepo.remove(user);
    return user;
  }
}
