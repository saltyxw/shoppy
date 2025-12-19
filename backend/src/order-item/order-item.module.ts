import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderItem } from "src/entities/order-item.entity";
import { OrderItemService } from "./order-item.service";
import { OrderItemResolver } from "./order-item.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
  providers: [OrderItemResolver, OrderItemService],
  exports: [TypeOrmModule],
})
export class OrderItemModule {}
