import { ObjectType, Field, ID } from "@nestjs/graphql";
import { ProductCategoryType } from "./product-category.type";

@ObjectType("Category")
export class CategoryType {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => [ProductCategoryType], { nullable: "itemsAndList" })
  products?: ProductCategoryType[];
}
