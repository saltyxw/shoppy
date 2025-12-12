import { Injectable } from "@nestjs/common";
import { CreateProductCategoryInput } from "./inputs/create-product-category.input";

@Injectable()
export class ProductCategoryService {
  create(createProductCategoryInput: CreateProductCategoryInput) {
    return "This action adds a new productCategory";
  }

  findAll() {
    return `This action returns all productCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} productCategory`;
  }
}
