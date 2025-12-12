import { Injectable } from "@nestjs/common";
import { CreateCategoryInput } from "./inputs/create-category.input";
import { UpdateCategoryInput } from "./inputs/update-category.input";

@Injectable()
export class CategoryService {
  create(createCategoryInput: CreateCategoryInput) {
    return "This action adds a new category";
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
