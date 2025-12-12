import { ObjectType, Field, Int } from "@nestjs/graphql";
import { UserModel } from "src/users/models/user.model";
import { ProductModel } from "src/products/models/product.model";

@ObjectType()
export class ReviewModel {
  @Field(() => Int)
  id: number;

  @Field()
  text: string;

  @Field(() => Int)
  rating: number;

  @Field()
  createdAt: Date;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  productId: number;

  @Field(() => UserModel)
  user: UserModel;

  @Field(() => ProductModel)
  product: ProductModel;
}
