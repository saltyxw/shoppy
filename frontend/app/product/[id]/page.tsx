"use client";

import { Rate, message } from "antd";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = useParams();

  const onReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    message.success("Відгук додано");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-30 space-y-10">
      <div className="bg-white rounded-2xl shadow p-8 flex gap-10">
        <Image
          src="/file.svg"
          alt="product"
          width={300}
          height={300}
          className="rounded-xl"
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">Product name</h1>

          <div className="flex items-center gap-2">
            <Rate disabled defaultValue={4} />
            <span className="text-gray-500">(4.0)</span>
          </div>

          <p className="text-2xl font-semibold text-black">29.90 $</p>

          <p className="text-gray-600">
            Тут буде опис товару. Довгий, нормальний, людський.
          </p>

          <div className="flex gap-4 pt-4">
            <button className="px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition">
              Buy now
            </button>
            <button className="px-6 py-3 rounded-xl border border-black hover:bg-gray-100 transition">
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-8 space-y-8">
        <h2 className="text-2xl font-bold">Reviews</h2>

        <div className="space-y-6">
          {[
            {
              id: 1,
              user: "John Doe",
              rating: 5,
              comment: "Дуже крутий товар!",
            },
          ].map((review) => (
            <div
              key={review.id}
              className="flex gap-4 border-b pb-4 last:border-none"
            >
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
                {review.user[0]}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{review.user}</span>
                  <Rate disabled value={review.rating} />
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t">
          <h3 className="text-xl font-semibold mb-4">Add review</h3>

          <form onSubmit={onReviewSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Rating</label>
              <Rate />
            </div>

            <div>
              <label className="block mb-1 font-medium">Comment</label>
              <textarea
                rows={4}
                className="w-full rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Write your review..."
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition"
            >
              Submit review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
