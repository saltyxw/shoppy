import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ProductCategoryModel } from "src/product-category/models/product-category.model";

@ObjectType()
export class CategoryModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [ProductCategoryModel], { nullable: true })
  products?: ProductCategoryModel[];
}
