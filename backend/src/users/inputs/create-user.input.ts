import { InputType, Field } from "@nestjs/graphql";
import { UserRoles } from "../../entities/user.entity";

@InputType()
export class CreateUserInput {
  @Field()
  fullname: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => UserRoles, { nullable: true })
  role?: UserRoles;
}
