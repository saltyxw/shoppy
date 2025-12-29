import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { CategoryService } from "./category.service";
import { CreateCategoryInput } from "./inputs/create-category.input";
import { CategoryModel } from "./models/category.model";

@Resolver(() => CategoryModel)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => CategoryModel)
  createCategory(
    @Args("createCategoryInput") createCategoryInput: CreateCategoryInput
  ) {
    return this.categoryService.create(createCategoryInput);
  }

  @Query(() => [CategoryModel], { name: "category" })
  findAll() {
    return this.categoryService.findAll();
  }

  @Query(() => CategoryModel, { name: "category" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => CategoryModel)
  removeCategory(@Args("id", { type: () => Int }) id: number) {
    return this.categoryService.remove(id);
  }
}
