import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductMediaService } from './product-media.service';
import { ProductMedia } from './entities/product-media.entity';
import { CreateProductMediaInput } from './dto/create-product-media.input';
import { UpdateProductMediaInput } from './dto/update-product-media.input';

@Resolver(() => ProductMedia)
export class ProductMediaResolver {
  constructor(private readonly productMediaService: ProductMediaService) {}

  @Mutation(() => ProductMedia)
  createProductMedia(@Args('createProductMediaInput') createProductMediaInput: CreateProductMediaInput) {
    return this.productMediaService.create(createProductMediaInput);
  }

  @Query(() => [ProductMedia], { name: 'productMedia' })
  findAll() {
    return this.productMediaService.findAll();
  }

  @Query(() => ProductMedia, { name: 'productMedia' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productMediaService.findOne(id);
  }

  @Mutation(() => ProductMedia)
  updateProductMedia(@Args('updateProductMediaInput') updateProductMediaInput: UpdateProductMediaInput) {
    return this.productMediaService.update(updateProductMediaInput.id, updateProductMediaInput);
  }

  @Mutation(() => ProductMedia)
  removeProductMedia(@Args('id', { type: () => Int }) id: number) {
    return this.productMediaService.remove(id);
  }
}
