import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class UpdateReviewInput {
  @Field({ nullable: true })
  text?: string;

  @Field(() => Int, { nullable: true })
  rating?: number;
}
