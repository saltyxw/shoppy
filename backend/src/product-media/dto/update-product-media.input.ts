import { CreateProductMediaInput } from './create-product-media.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductMediaInput extends PartialType(CreateProductMediaInput) {
  @Field(() => Int)
  id: number;
}
