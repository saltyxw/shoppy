import { Injectable } from "@nestjs/common";
import { CreateOrderItemInput } from "./inputs/create-order-item.input";

@Injectable()
export class OrderItemService {
  create(createOrderItemInput: CreateOrderItemInput) {
    return "This action adds a new orderItem";
  }

  findAll() {
    return `This action returns all orderItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
