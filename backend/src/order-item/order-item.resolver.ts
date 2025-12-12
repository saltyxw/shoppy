import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { OrderItemService } from "./order-item.service";
import { CreateOrderItemInput } from "./inputs/create-order-item.input";
import { OrderItemModel } from "./models/order-item.model";

@Resolver(() => OrderItemModel)
export class OrderItemResolver {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Mutation(() => OrderItemModel)
  createOrderItem(
    @Args("createOrderItemInput") createOrderItemInput: CreateOrderItemInput
  ) {
    return this.orderItemService.create(createOrderItemInput);
  }

  @Query(() => [OrderItemModel], { name: "orderItem" })
  findAll() {
    return this.orderItemService.findAll();
  }

  @Query(() => OrderItemModel, { name: "orderItem" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.orderItemService.findOne(id);
  }

  @Mutation(() => OrderItemModel)
  removeOrderItem(@Args("id", { type: () => Int }) id: number) {
    return this.orderItemService.remove(id);
  }
}
