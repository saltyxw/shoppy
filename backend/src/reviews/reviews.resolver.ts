import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ReviewsService } from "./reviews.service";
import { ReviewModel } from "./models/review.model";
import { CreateReviewInput } from "./inputs/create-review.input";
import { UpdateReviewInput } from "./inputs/update-review.input";

@Resolver(() => ReviewModel)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Mutation(() => ReviewModel)
  createReview(
    @Args("createReviewInput") createReviewInput: CreateReviewInput
  ) {
    return this.reviewsService.create(createReviewInput);
  }

  @Query(() => [ReviewModel], { name: "reviews" })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Query(() => ReviewModel, { name: "review" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.reviewsService.findOne(id);
  }

  @Mutation(() => ReviewModel)
  removeReview(@Args("id", { type: () => Int }) id: number) {
    return this.reviewsService.remove(id);
  }
}
