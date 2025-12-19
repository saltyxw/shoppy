import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryResolver } from "./category.resolver";
import { Category } from "src/entities/category.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryResolver, CategoryService],
  exports: [TypeOrmModule],
})
export class CategoryModule {}
