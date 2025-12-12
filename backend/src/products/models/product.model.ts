import { ObjectType, Field, Int, Float } from "@nestjs/graphql";
import { ProductMediaModel } from "src/product-media/models/product-media.model";
import { ProductCategoryModel } from "src/product-category/models/product-category.model";
import { ReviewModel } from "src/reviews/models/review.model";
import { OrderItemModel } from "src/order-item/models/order-item.model";

@ObjectType()
export class ProductModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => [ProductMediaModel], { nullable: true })
  medias?: ProductMediaModel[];

  @Field(() => [ProductCategoryModel], { nullable: true })
  categories?: ProductCategoryModel[];

  @Field(() => [OrderItemModel], { nullable: true })
  orderItems?: OrderItemModel[];

  @Field(() => [ReviewModel], { nullable: true })
  reviews?: ReviewModel[];
}
