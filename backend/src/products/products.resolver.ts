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
    @Args("createProductInput") createProductInput: CreateProductInput
  ) {
    return this.productsService.create(createProductInput);
  }

  @Query(() => [ProductModel], { name: "products" })
  findAll() {
    return this.productsService.findAll();
  }

  @Query(() => ProductModel, { name: "product" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => ProductModel)
  removeProduct(@Args("id", { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }
}
