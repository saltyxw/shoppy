import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Review } from "src/entities/review.entity";
import { User } from "src/entities/user.entity";
import { Product } from "src/entities/product.entity";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewInput } from "./inputs/update-review.input";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>
  ) {}

  async createReview(input: CreateReviewDto): Promise<Review> {
    const user = await this.userRepo.findOne({ where: { id: input.userId } });
    const product = await this.productRepo.findOne({
      where: { id: input.productId },
    });

    if (!user) throw new Error("User not found");
    if (!product) throw new Error("Product not found");

    const review = this.reviewRepo.create({
      text: input.text,
      rating: input.rating,
      user,
      product,
      userId: user.id,
      productId: product.id,
      createdAt: new Date(),
    });

    return this.reviewRepo.save(review);
  }

  async updateReview(id: number, input: UpdateReviewInput): Promise<Review> {
    const review = await this.reviewRepo.findOne({ where: { id } });
    if (!review) throw new Error("Review not found");

    if (input.text !== undefined) review.text = input.text;
    if (input.rating !== undefined) review.rating = input.rating;

    return this.reviewRepo.save(review);
  }

  async deleteReview(id: number): Promise<boolean> {
    const result = await this.reviewRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
