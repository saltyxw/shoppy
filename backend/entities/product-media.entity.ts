import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column({ nullable: true })
  videoUrl?: string;

  @Column()
  orderPosition: number;

  @Column()
  productId: number;

  @ManyToOne(() => Product, (product) => product.medias, {
    onDelete: "CASCADE",
  })
  product: Product;
}
