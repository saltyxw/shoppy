import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { UserType } from "./user.type";
import { ProductType } from "./product.type";

@ObjectType("Review")
export class ReviewType {
  @Field(() => ID)
  id: number;

  @Field()
  text: string;

  @Field(() => Int)
  rating: number;

  @Field()
  createdAt: Date;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  productId: number;

  @Field(() => UserType, { nullable: true })
  user?: UserType;

  @Field(() => ProductType, { nullable: true })
  product?: ProductType;
}
