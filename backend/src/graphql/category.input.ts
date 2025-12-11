import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateCategoryInput {
  @Field({ nullable: true })
  name?: string;
}
