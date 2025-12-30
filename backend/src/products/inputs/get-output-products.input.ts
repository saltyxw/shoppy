import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ProductModel } from "../models/product.model";

@ObjectType()
export class PaginatedProducts {
  @Field(() => [ProductModel])
  items: ProductModel[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalPages: number;
}
