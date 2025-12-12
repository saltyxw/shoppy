import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class CreateProductMediaInput {
  @Field()
  imageUrl: string;

  @Field({ nullable: true })
  videoUrl?: string;

  @Field(() => Int)
  orderPosition: number;

  @Field(() => Int)
  productId: number;
}
