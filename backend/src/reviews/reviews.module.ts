import { Module } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { ReviewsResolver } from "./reviews.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "src/entities/review.entity";
import { Product } from "src/entities/product.entity";
import { User } from "src/entities/user.entity";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Review, Product, User]), UsersModule],
  providers: [ReviewsResolver, ReviewsService],
  exports: [TypeOrmModule],
})
export class ReviewsModule {}
