import { ObjectType, Field, Int } from "@nestjs/graphql";
import { UserModel } from "src/users/models/user.model";
import { OrderItemModel } from "src/order-item/models/order-item.model";

@ObjectType()
export class OrderModel {
  @Field(() => Int)
  id: number;

  @Field()
  createdAt: Date;

  @Field(() => Int)
  userId: number;

  @Field(() => UserModel)
  user: UserModel;

  @Field(() => [OrderItemModel], { nullable: true })
  items?: OrderItemModel[];
}
