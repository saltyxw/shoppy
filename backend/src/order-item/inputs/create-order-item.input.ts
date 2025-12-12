import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class CreateOrderItemInput {
  @Field(() => Int)
  orderId: number;

  @Field(() => Int)
  productId: number;

  @Field(() => Int)
  quantity: number;
}
