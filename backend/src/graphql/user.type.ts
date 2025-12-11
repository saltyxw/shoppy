import { ObjectType, Field, ID } from "@nestjs/graphql";
import { UserRoles } from "./enums";
import { OrderType } from "./order.type";
import { ReviewType } from "./review.type";

@ObjectType("User")
export class UserType {
  @Field(() => ID)
  id: number;

  @Field()
  fullname: string;

  @Field()
  email: string;

  @Field(() => UserRoles)
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
  expTimeemailVerificationToken?: Date;

  @Field(() => [OrderType])
  orders?: OrderType[];

  @Field(() => [ReviewType])
  reviews?: ReviewType[];
}
