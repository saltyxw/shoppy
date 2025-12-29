import { CreateCategoryDto } from "src/category/dto/create-category.dto";
import { CreateProductMediaDto } from "src/product-media/dto/create-product-media.dto";

export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: CreateCategoryDto;
  media: CreateProductMediaDto;
}
