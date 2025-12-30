export class GetProductsQueryDto {
  page?: number = 1;
  limit?: number = 10;

  sortBy?: "newest" | "oldest" | "cheapest" | "mostExpensive" | "topRated";
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}
