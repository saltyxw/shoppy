import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "./order.entity";
import { Review } from "./review.entity";

export enum UserRoles {
  ADMIN = "ADMIN",
  BUYER = "BUYER",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: "enum",
    enum: UserRoles,
    default: UserRoles.BUYER,
  })
  role: UserRoles;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  registerDate: Date;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column({ type: "timestamp", nullable: true })
  expTimeRefreshToken?: Date;

  @Column({ nullable: true })
  emailVerificationToken?: string;

  @Column({ type: "timestamp", nullable: true })
  expTimeemailVerificationToken?: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
