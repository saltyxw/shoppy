import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource } from "typeorm";
import { Order } from "src/entities/order.entity";
import { OrderItem } from "src/entities/order-item.entity";
import { User } from "src/entities/user.entity";
import { Product } from "src/entities/product.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { CreateOrderItemDto } from "src/order-item/dto/create-order-item.dto";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @InjectRepository(OrderItem)
    private orderItemRepo: Repository<OrderItem>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    private dataSource: DataSource
  ) {}

  async createOrder(input: CreateOrderDto): Promise<Order> {
    const user = await this.userRepo.findOne({ where: { id: input.userId } });
    if (!user) throw new Error("User not found");

    const order = this.orderRepo.create({
      user,
      userId: user.id,
      createdAt: new Date(),
    });

    return this.orderRepo.save(order);
  }

  async addOrderItem(input: CreateOrderItemDto): Promise<OrderItem> {
    const order = await this.orderRepo.findOne({
      where: { id: input.orderId },
    });
    const product = await this.productRepo.findOne({
      where: { id: input.productId },
    });

    if (!order) throw new Error("Order not found");
    if (!product) throw new Error("Product not found");
    if (input.quantity <= 0) throw new Error("Quantity must be greater than 0");
    if (product.quantity < input.quantity)
      throw new Error("Not enough product in stock");

    const orderItem = this.orderItemRepo.create({
      order,
      orderId: order.id,
      product,
      productId: product.id,
      quantity: input.quantity,
    });

    product.quantity -= input.quantity;
    await this.productRepo.save(product);

    return this.orderItemRepo.save(orderItem);
  }

  async updateOrderItem(id: number, quantity: number): Promise<OrderItem> {
    const orderItem = await this.orderItemRepo.findOne({
      where: { id },
      relations: ["product"],
    });
    if (!orderItem) throw new Error("Order item not found");
    if (quantity <= 0) throw new Error("Quantity must be greater than 0");

    const diff = quantity - orderItem.quantity;

    if (orderItem.product.quantity < diff)
      throw new Error("Not enough product in stock");

    orderItem.product.quantity -= diff;
    await this.productRepo.save(orderItem.product);

    orderItem.quantity = quantity;
    return this.orderItemRepo.save(orderItem);
  }

  async removeOrderItem(id: number): Promise<OrderItem> {
    const orderItem = await this.orderItemRepo.findOne({
      where: { id },
      relations: ["product", "order"],
    });
    if (!orderItem) throw new Error("Order item not found");

    orderItem.product.quantity += orderItem.quantity;
    await this.productRepo.save(orderItem.product);

    const deletedItem = { ...orderItem };

    await this.orderItemRepo.remove(orderItem);

    return deletedItem;
  }

  async removeOrder(id: number): Promise<boolean> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ["items", "items.product"],
    });
    if (!order) throw new Error("Order not found");

    for (const item of order.items) {
      item.product.quantity += item.quantity;
      await this.productRepo.save(item.product);
    }

    const result = await this.orderRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
