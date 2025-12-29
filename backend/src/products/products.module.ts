import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsResolver } from "./products.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/entities/product.entity";
import { Category } from "src/entities/category.entity";
import { ProductMedia } from "src/entities/product-media.entity";
import { CloudinaryModule } from "src/configs/cloudinary.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, ProductMedia]),
    CloudinaryModule,
  ],
  providers: [ProductsResolver, ProductsService],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
