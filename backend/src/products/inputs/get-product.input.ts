import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class GetProductsInput {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  page?: number;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  limit?: number;

  @Field({ nullable: true })
  sortBy?: "newest" | "oldest" | "cheapest" | "mostExpensive" | "topRated";

  @Field(() => Int, { nullable: true })
  categoryId?: number;

  @Field(() => Int, { nullable: true })
  minPrice?: number;

  @Field(() => Int, { nullable: true })
  maxPrice?: number;

  @Field({ nullable: true })
  inStock?: boolean;
}
