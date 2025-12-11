import { Injectable } from '@nestjs/common';
import { CreateProductMediaInput } from './dto/create-product-media.input';
import { UpdateProductMediaInput } from './dto/update-product-media.input';

@Injectable()
export class ProductMediaService {
  create(createProductMediaInput: CreateProductMediaInput) {
    return 'This action adds a new productMedia';
  }

  findAll() {
    return `This action returns all productMedia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productMedia`;
  }

  update(id: number, updateProductMediaInput: UpdateProductMediaInput) {
    return `This action updates a #${id} productMedia`;
  }

  remove(id: number) {
    return `This action removes a #${id} productMedia`;
  }
}
