import { Test, TestingModule } from '@nestjs/testing';
import { ProductMediaResolver } from './product-media.resolver';
import { ProductMediaService } from './product-media.service';

describe('ProductMediaResolver', () => {
  let resolver: ProductMediaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductMediaResolver, ProductMediaService],
    }).compile();

    resolver = module.get<ProductMediaResolver>(ProductMediaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
