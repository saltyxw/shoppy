import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { ProductType } from "./product.type";

@ObjectType("ProductMedia")
export class ProductMediaType {
  @Field(() => ID)
  id: number;

  @Field()
  imageUrl: string;

  @Field({ nullable: true })
  videoUrl?: string;

  @Field(() => Int)
  orderPosition: number;

  @Field(() => Int)
  productId: number;

  @Field(() => ProductType, { nullable: true })
  product?: ProductType;
}
