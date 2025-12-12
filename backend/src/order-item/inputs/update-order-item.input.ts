import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class UpdateOrderItemInput {
  @Field(() => Int, { nullable: true })
  quantity?: number;
}
