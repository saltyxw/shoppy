import { ObjectType, Field, ID } from "@nestjs/graphql";
import { OrderItemType } from "./order-item.type";
import { UserType } from "./user.type";

@ObjectType("Order")
export class OrderType {
  @Field(() => ID)
  id: number;

  @Field()
  createdAt: Date;

  @Field()
  userId: number;

  @Field(() => UserType, { nullable: true })
  user?: UserType;

  @Field(() => [OrderItemType])
  items?: OrderItemType[];
}
