import { Module } from "@nestjs/common";
import { ProductMediaService } from "./product-media.service";
import { ProductMediaResolver } from "./product-media.resolver";
import { ProductMedia } from "src/entities/product-media.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([ProductMedia])],
  providers: [ProductMediaResolver, ProductMediaService],
  exports: [TypeOrmModule],
})
export class ProductMediaModule {}
