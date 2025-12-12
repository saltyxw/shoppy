import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class CreateProductCategoryInput {
  @Field(() => Int)
  productId: number;

  @Field(() => Int)
  categoryId: number;
}
