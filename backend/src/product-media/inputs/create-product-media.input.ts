import { InputType, Field, Int } from "@nestjs/graphql";
import { Min } from "class-validator";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { FileUpload } from "graphql-upload/GraphQLUpload.mjs";

@InputType()
export class CreateProductMediaInput {
  @Field(() => [GraphQLUpload], { nullable: true })
  files?: Promise<FileUpload>[];

  @Min(0)
  @Field(() => Int)
  orderPosition: number;
}
