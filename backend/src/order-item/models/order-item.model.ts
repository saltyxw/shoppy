import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ProductModel } from "src/products/models/product.model";
import { OrderModel } from "src/order/models/order.model";

@ObjectType()
export class OrderItemModel {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  productId: number;

  @Field(() => Int)
  orderId: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => ProductModel, { nullable: true })
  product?: ProductModel;

  @Field(() => OrderModel, { nullable: true })
  order?: OrderModel;
}
