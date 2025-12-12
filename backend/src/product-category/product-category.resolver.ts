import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ProductCategoryService } from "./product-category.service";
import { ProductCategoryModel } from "./models/product-category.model";
import { CreateProductCategoryInput } from "./inputs/create-product-category.input";

@Resolver(() => ProductCategoryModel)
export class ProductCategoryResolver {
  constructor(
    private readonly productCategoryService: ProductCategoryService
  ) {}

  @Mutation(() => ProductCategoryModel)
  createProductCategory(
    @Args("createProductCategoryInput")
    createProductCategoryInput: CreateProductCategoryInput
  ) {
    return this.productCategoryService.create(createProductCategoryInput);
  }

  @Query(() => [ProductCategoryModel], { name: "productCategory" })
  findAll() {
    return this.productCategoryService.findAll();
  }

  @Query(() => ProductCategoryModel, { name: "productCategory" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.productCategoryService.findOne(id);
  }

  @Mutation(() => ProductCategoryModel)
  removeProductCategory(@Args("id", { type: () => Int }) id: number) {
    return this.productCategoryService.remove(id);
  }
}
