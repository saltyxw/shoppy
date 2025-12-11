import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { ProductMediaType } from "./product-media.type";
import { ProductCategoryType } from "./product-category.type";
import { OrderItemType } from "./order-item.type";
import { ReviewType } from "./review.type";

@ObjectType("Product")
export class ProductType {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => [ProductMediaType], { nullable: "itemsAndList" })
  medias?: ProductMediaType[];

  @Field(() => [ProductCategoryType], { nullable: "itemsAndList" })
  categories?: ProductCategoryType[];

  @Field(() => [OrderItemType], { nullable: "itemsAndList" })
  orderItems?: OrderItemType[];

  @Field(() => [ReviewType], { nullable: "itemsAndList" })
  reviews?: ReviewType[];
}
