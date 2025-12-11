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

@InputType()
export class UpdateReviewInput {
  @Field({ nullable: true })
  text?: string;

  @Field(() => Int, { nullable: true })
  rating?: number;
}
