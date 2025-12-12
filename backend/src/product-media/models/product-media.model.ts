import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ProductModel } from "src/products/models/product.model";

@ObjectType()
export class ProductMediaModel {
  @Field(() => Int)
  id: number;

  @Field()
  imageUrl: string;

  @Field({ nullable: true })
  videoUrl?: string;

  @Field(() => Int)
  orderPosition: number;

  @Field(() => Int)
  productId: number;

  @Field(() => ProductModel)
  product: ProductModel;
}
