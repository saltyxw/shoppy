import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class CreateReviewInput {
  @Field()
  text: string;

  @Field(() => Int)
  rating: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  productId: number;
}
