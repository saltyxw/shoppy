import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProductMedia } from "./product-media.entity";
import { ProductCategory } from "./product-category.entity";
import { OrderItem } from "./order-item.entity";
import { Review } from "./review.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @OneToMany(() => ProductMedia, (media) => media.product)
  medias: ProductMedia[];

  @OneToMany(() => ProductCategory, (pc) => pc.product)
  categories: ProductCategory[];

  @OneToMany(() => OrderItem, (item) => item.product)
  orderItems: OrderItem[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
}
