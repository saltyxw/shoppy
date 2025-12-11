import { Module } from '@nestjs/common';
import { ProductMediaService } from './product-media.service';
import { ProductMediaResolver } from './product-media.resolver';

@Module({
  providers: [ProductMediaResolver, ProductMediaService],
})
export class ProductMediaModule {}
