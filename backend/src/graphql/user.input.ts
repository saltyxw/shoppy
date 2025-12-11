import { InputType, Field } from "@nestjs/graphql";
import { UserRoles } from "./enums";

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

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  fullname?: string;

  @Field({ nullable: true })
  password?: string;

  @Field(() => UserRoles, { nullable: true })
  role?: UserRoles;
}
