import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  rating: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column()
  userId: number;

  @Column()
  productId: number;

  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: "CASCADE",
  })
  product: Product;
}
