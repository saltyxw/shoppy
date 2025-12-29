import { InputType, Field, Int } from "@nestjs/graphql";
import { CreateCategoryInput } from "src/category/inputs/create-category.input";
import { CreateProductMediaInput } from "src/product-media/inputs/create-product-media.input";
import { IsNotEmpty, Min, Length } from "class-validator";

@InputType()
export class CreateProductInput {
  @IsNotEmpty()
  @Field()
  @Length(3, 50)
  name: string;

  @IsNotEmpty()
  @Field()
  description: string;

  @IsNotEmpty()
  @Min(0)
  @Field(() => Int)
  price: number;

  @IsNotEmpty()
  @Min(0)
  @Field(() => Int)
  quantity: number;

  @Field(() => CreateCategoryInput)
  category: CreateCategoryInput;

  @Field(() => CreateProductMediaInput)
  media: CreateProductMediaInput;
}
