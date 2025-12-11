import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "./product.entity";
import { Category } from "./category.entity";

@Entity()
export class ProductCategory {
  @PrimaryColumn()
  productId: number;

  @PrimaryColumn()
  categoryId: number;

  @ManyToOne(() => Product, (product) => product.categories, {
    onDelete: "CASCADE",
  })
  product: Product;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "CASCADE",
  })
  category: Category;
}
