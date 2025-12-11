import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  userId: number;

  @Field(() => [CreateOrderItemInput])
  items: CreateOrderItemInput[];
}

@InputType()
export class CreateOrderItemInput {
  @Field(() => Int)
  productId: number;

  @Field(() => Int, { nullable: true, defaultValue: 1 })
  quantity?: number;
}
