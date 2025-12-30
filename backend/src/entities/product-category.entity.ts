import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
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
  @JoinColumn({ name: "productId" })
  product: Product;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "categoryId" })
  category: Category;
}
