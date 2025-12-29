import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { OrderModel } from "./models/order.model";
import { OrderItemModel } from "src/order-item/models/order-item.model";
import { OrdersService } from "./order.service";
import { CreateOrderInput } from "./inputs/create-order.input";
import { CreateOrderItemInput } from "src/order-item/inputs/create-order-item.input";

@Resolver()
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => OrderModel)
  createOrder(@Args("createOrderData") createOrderData: CreateOrderInput) {
    return this.ordersService.createOrder(createOrderData);
  }

  @Mutation(() => OrderItemModel)
  addOrderItem(
    @Args("createOrderItemData") createOrderItemData: CreateOrderItemInput
  ) {
    return this.ordersService.addOrderItem(createOrderItemData);
  }

  @Mutation(() => OrderItemModel)
  updateOrderItem(@Args("id") id: number, @Args("quantity") quantity: number) {
    return this.ordersService.updateOrderItem(id, quantity);
  }

  @Mutation(() => Boolean)
  removeOrderItem(@Args("id") id: number) {
    return this.ordersService.removeOrderItem(id);
  }

  @Mutation(() => Boolean)
  removeOrder(@Args("id") id: number) {
    return this.ordersService.removeOrder(id);
  }
}
