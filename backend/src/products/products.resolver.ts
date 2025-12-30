import { Resolver, Mutation, Args, Query, Int } from "@nestjs/graphql";
import { ProductsService } from "./products.service";
import { ProductModel } from "./models/product.model";
import { CreateProductInput } from "./inputs/create-product.input";
import { UpdateProductInput } from "./inputs/update-product.input";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { UserRoles } from "src/entities/user.entity";
import { Roles } from "src/auth/decorators/roles.decorator";
import { PaginatedProducts } from "./inputs/get-output-products.input";
import { GetProductsInput } from "./inputs/get-product.input";

@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
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

  @Query(() => PaginatedProducts)
  async products(
    @Args("query", { nullable: true }) query: GetProductsInput
  ): Promise<PaginatedProducts> {
    return this.productsService.getProducts(query || {});
  }

  @Query(() => ProductModel)
  async product(
    @Args("id", { type: () => Int }) id: number
  ): Promise<ProductModel> {
    return this.productsService.getProductById(id);
  }

  @Query(() => PaginatedProducts)
  async searchProducts(
    @Args("name") name: string,
    @Args("page", { type: () => Int, nullable: true, defaultValue: 1 })
    page?: number,
    @Args("limit", { type: () => Int, nullable: true, defaultValue: 10 })
    limit?: number
  ): Promise<PaginatedProducts> {
    return this.productsService.searchProductsByName(name, page, limit);
  }
}
