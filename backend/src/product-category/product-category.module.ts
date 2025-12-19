import { Module } from "@nestjs/common";
import { ProductCategoryService } from "./product-category.service";
import { ProductCategoryResolver } from "./product-category.resolver";
import { ProductCategory } from "src/entities/product-category.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  providers: [ProductCategoryResolver, ProductCategoryService],
  exports: [TypeOrmModule],
})
export class ProductCategoryModule {}
