import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./product.entity";
import { Order } from "./order.entity";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  orderId: number;

  @Column({ default: 1 })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.orderItems, {
    onDelete: "CASCADE",
  })
  product: Product;

  @ManyToOne(() => Order, (order) => order.items, {
    onDelete: "CASCADE",
  })
  order: Order;
}
