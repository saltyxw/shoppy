import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersService } from "./order.service";
import { OrdersResolver } from "./order.resolver";
import { Order } from "src/entities/order.entity";
import { OrderItem } from "src/entities/order-item.entity";
import { User } from "src/entities/user.entity";
import { Product } from "src/entities/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, User, Product])],
  providers: [OrdersService, OrdersResolver],
  exports: [OrdersService],
})
export class OrdersModule {}
