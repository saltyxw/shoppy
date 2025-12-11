import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { ProductType } from "./product.type";
import { OrderType } from "./order.type";

@ObjectType("OrderItem")
export class OrderItemType {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  productId: number;

  @Field(() => Int)
  orderId: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => ProductType, { nullable: true })
  product?: ProductType;

  @Field(() => OrderType, { nullable: true })
  order?: OrderType;
}
