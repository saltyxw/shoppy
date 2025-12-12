import { Injectable } from "@nestjs/common";
import { CreateReviewInput } from "./inputs/create-review.input";
import { UpdateReviewInput } from "./inputs/update-review.input";

@Injectable()
export class ReviewsService {
  create(createReviewInput: CreateReviewInput) {
    return "This action adds a new review";
  }

  findAll() {
    return `This action returns all reviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewInput: UpdateReviewInput) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
