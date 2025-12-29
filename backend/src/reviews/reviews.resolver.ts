import { Resolver, Mutation, Args, Int } from "@nestjs/graphql";
import { ReviewModel } from "./models/review.model";
import { ReviewsService } from "./reviews.service";
import { CreateReviewInput } from "./inputs/create-review.input";
import { UpdateReviewInput } from "./inputs/update-review.input";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/guards/auth.guard";

@Resolver(() => ReviewModel)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => ReviewModel)
  createReview(@Args("createReviewData") createReviewData: CreateReviewInput) {
    return this.reviewsService.createReview(createReviewData);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ReviewModel)
  updateReview(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateReviewData") updateReviewData: UpdateReviewInput
  ) {
    return this.reviewsService.updateReview(id, updateReviewData);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  deleteReview(@Args("id", { type: () => Int }) id: number) {
    return this.reviewsService.deleteReview(id);
  }
}
