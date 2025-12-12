import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class UpdateProductMediaInput {
  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  videoUrl?: string;

  @Field(() => Int, { nullable: true })
  orderPosition?: number;
}
