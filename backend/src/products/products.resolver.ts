import { Resolver, Mutation, Args } from "@nestjs/graphql";
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

  @Mutation(() => ProductModel)
  updateProduct(
    @Args("id") id: number,
    @Args("updateProductData") updateProductData: UpdateProductInput
  ) {
    return this.productsService.updateProduct(id, updateProductData);
  }

  @Mutation(() => Boolean)
  deleteProduct(@Args("id") id: number) {
    return this.productsService.deleteProduct(id);
  }
}
