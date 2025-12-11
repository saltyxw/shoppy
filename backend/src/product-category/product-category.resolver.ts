import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductCategoryService } from './product-category.service';
import { ProductCategory } from './entities/product-category.entity';
import { CreateProductCategoryInput } from './dto/create-product-category.input';
import { UpdateProductCategoryInput } from './dto/update-product-category.input';

@Resolver(() => ProductCategory)
export class ProductCategoryResolver {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  @Mutation(() => ProductCategory)
  createProductCategory(@Args('createProductCategoryInput') createProductCategoryInput: CreateProductCategoryInput) {
    return this.productCategoryService.create(createProductCategoryInput);
  }

  @Query(() => [ProductCategory], { name: 'productCategory' })
  findAll() {
    return this.productCategoryService.findAll();
  }

  @Query(() => ProductCategory, { name: 'productCategory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productCategoryService.findOne(id);
  }

  @Mutation(() => ProductCategory)
  updateProductCategory(@Args('updateProductCategoryInput') updateProductCategoryInput: UpdateProductCategoryInput) {
    return this.productCategoryService.update(updateProductCategoryInput.id, updateProductCategoryInput);
  }

  @Mutation(() => ProductCategory)
  removeProductCategory(@Args('id', { type: () => Int }) id: number) {
    return this.productCategoryService.remove(id);
  }
}
