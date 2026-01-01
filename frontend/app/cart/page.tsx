"use client";

import { useCartStore } from "@/store/cart.store";
import { Button, Card, Empty } from "antd";
import Image from "next/image";

export default function CartPage() {
  const { items, removeFromCart } = useCartStore();

  if (!items.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Empty description="Your cart is empty" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id}>
            <div className="flex items-center gap-4">
              <Image src={item.image} alt={item.name} width={80} height={80} />

              <div className="flex-1">
                <h2 className="font-semibold">{item.name}</h2>
                <p>${item.price}</p>
              </div>

              <Button danger onClick={() => removeFromCart(item.id)}>
                Remove
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <Button type="primary" size="large">
          Checkout
        </Button>
      </div>
    </div>
  );
}
