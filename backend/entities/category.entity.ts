import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProductCategory } from "./product-category.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => ProductCategory, (pc) => pc.category)
  products: ProductCategory[];
}
