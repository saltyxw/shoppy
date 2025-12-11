import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ProductType } from "./product.type";
import { CategoryType } from "./category.type";

@ObjectType("ProductCategory")
export class ProductCategoryType {
  @Field(() => Int)
  productId: number;

  @Field(() => Int)
  categoryId: number;

  @Field(() => ProductType, { nullable: true })
  product?: ProductType;

  @Field(() => CategoryType, { nullable: true })
  category?: CategoryType;
}
