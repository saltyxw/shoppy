import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { UpdateUserInput } from "./inputs/update-user.input";
import { UserModel } from "./models/user.model";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import type { UserPayload } from "src/auth/types/user.payload";

@UseGuards(AuthGuard)
@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserModel)
  updateUser(
    @Args("updateUserData") updateUserData: UpdateUserInput,
    @CurrentUser() user: UserPayload
  ) {
    return this.usersService.updateProfile(user.sub, updateUserData);
  }

  @Mutation(() => Boolean)
  changePassword(
    @Args("currentPassword") currentPassword: string,
    @Args("newPassword") newPassword: string,
    @CurrentUser() user: UserPayload
  ) {
    return this.usersService
      .changePassword(user.sub, currentPassword, newPassword)
      .then(() => true);
  }
}
