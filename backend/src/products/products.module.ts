import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsResolver } from "./products.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/entities/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsResolver, ProductsService],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
