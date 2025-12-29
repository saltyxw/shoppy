import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ProductsService } from "./products.service";
import { ProductModel } from "./models/product.model";
import { CreateProductInput } from "./inputs/create-product.input";
import { UpdateProductInput } from "./inputs/update-product.input";

@Resolver(() => ProductModel)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => ProductModel)
  createProduct(
    @Args("createProductData") createProductData: CreateProductInput
  ) {
    return this.productsService.create(createProductData);
  }
}
