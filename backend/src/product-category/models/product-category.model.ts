import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ProductModel } from "src/products/models/product.model";
import { CategoryModel } from "src/category/models/category.model";

@ObjectType()
export class ProductCategoryModel {
  @Field(() => Int)
  productId: number;

  @Field(() => Int)
  categoryId: number;

  @Field(() => ProductModel)
  product: ProductModel;

  @Field(() => CategoryModel)
  category: CategoryModel;
}
