import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ProductMedia {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
