import { ObjectType, Field, Int } from "@nestjs/graphql";
import { UserRoles } from "src/entities/user.entity";

import { registerEnumType } from "@nestjs/graphql";

registerEnumType(UserRoles, {
  name: "UserRoles",
});

@ObjectType()
export class UserModel {
  @Field(() => Int)
  id: number;

  @Field()
  fullname: string;

  @Field()
  email: string;

  @Field()
  role: UserRoles;

  @Field()
  registerDate: Date;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field({ nullable: true })
  expTimeRefreshToken?: Date;

  @Field({ nullable: true })
  emailVerificationToken?: string;

  @Field({ nullable: true })
  expTimeEmailVerificationToken?: Date;
}
