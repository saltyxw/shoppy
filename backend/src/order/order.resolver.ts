import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { OrderService } from "./order.service";
import { CreateOrderInput } from "./inputs/create-order.input";
import { UpdateOrderInput } from "./inputs/update-order.input";
import { OrderModel } from "./models/order.model";

@Resolver(() => OrderModel)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => OrderModel)
  createOrder(@Args("createOrderInput") createOrderInput: CreateOrderInput) {
    return this.orderService.create(createOrderInput);
  }

  @Query(() => [OrderModel], { name: "order" })
  findAll() {
    return this.orderService.findAll();
  }

  @Query(() => OrderModel, { name: "order" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.orderService.findOne(id);
  }

  @Mutation(() => OrderModel)
  removeOrder(@Args("id", { type: () => Int }) id: number) {
    return this.orderService.remove(id);
  }
}
