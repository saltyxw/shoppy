"use client";

import { Button } from "antd";
import Image from "next/image";
import { useCartStore } from "@/store/cart.store";

type Props = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ id, name, price, image }: Props) {
  const { addToCart, isInCart } = useCartStore();

  const inCart = isInCart(id);

  return (
    <div className="relative w-[260px] shrink-0 border rounded-xl p-4">
      <Image src={image} alt={name} width={200} height={200} />

      <span className="absolute top-3 right-3 bg-white px-3 py-1 text-xs border rounded-full">
        Category
      </span>

      <h2 className="mt-2 font-semibold">{name}</h2>

      <div className="flex justify-between my-2">
        <span>⭐ 5.0</span>
        <b>${price}</b>
      </div>

      {!inCart ? (
        <div className="flex gap-2">
          <Button
            className="w-full"
            onClick={() =>
              addToCart({
                id,
                name,
                price,
                image,
                quantity: 1,
              })
            }
          >
            Add to cart
          </Button>

          <Button type="primary" className="w-full">
            Buy
          </Button>
        </div>
      ) : (
        <Button disabled className="w-full">
          Already in cart
        </Button>
      )}
    </div>
  );
}
