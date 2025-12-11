import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => [CreateProductMediaInput], { nullable: true })
  medias?: CreateProductMediaInput[];

  @Field(() => [Int], { nullable: true, description: "category ids" })
  categoryIds?: number[];
}

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  price?: number;

  @Field(() => Int, { nullable: true })
  quantity?: number;

  @Field(() => [CreateProductMediaInput], { nullable: true })
  medias?: CreateProductMediaInput[];

  @Field(() => [Int], { nullable: true })
  categoryIds?: number[];
}

// media input is used inside product input
@InputType()
export class CreateProductMediaInput {
  @Field()
  imageUrl: string;

  @Field({ nullable: true })
  videoUrl?: string;

  @Field(() => Int)
  orderPosition: number;
}
