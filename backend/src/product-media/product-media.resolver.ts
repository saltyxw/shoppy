import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ProductMediaService } from "./product-media.service";
import { ProductMediaModel } from "./models/product-media.model";
import { CreateProductMediaInput } from "./inputs/create-product-media.input";
import { UpdateProductMediaInput } from "./inputs/update-product-media.input";

@Resolver(() => ProductMediaModel)
export class ProductMediaResolver {
  constructor(private readonly productMediaService: ProductMediaService) {}

  @Mutation(() => ProductMediaModel)
  createProductMedia(
    @Args("createProductMediaInput")
    createProductMediaInput: CreateProductMediaInput
  ) {
    return this.productMediaService.create(createProductMediaInput);
  }

  @Query(() => [ProductMediaModel], { name: "productMedia" })
  findAll() {
    return this.productMediaService.findAll();
  }

  @Query(() => ProductMediaModel, { name: "productMedia" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.productMediaService.findOne(id);
  }

  @Mutation(() => ProductMediaModel)
  removeProductMedia(@Args("id", { type: () => Int }) id: number) {
    return this.productMediaService.remove(id);
  }
}
