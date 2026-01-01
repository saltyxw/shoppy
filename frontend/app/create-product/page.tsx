"use client";

import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function CreateProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | undefined>();
  const [quantity, setQuantity] = useState<number | undefined>();
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<any[]>([]);

  const onFinish = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ name, description, price, quantity, category, images });
    message.success("Товар успішно створено");

    setName("");
    setDescription("");
    setPrice(undefined);
    setQuantity(undefined);
    setCategory("");
    setImages([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-24 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-8 space-y-6">
        <h1 className="text-2xl font-bold">Add Product</h1>

        <form onSubmit={onFinish} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Products Name</label>
            <input
              type="text"
              className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Description</label>
            <textarea
              rows={4}
              className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 flex flex-col">
              <label className="mb-1 font-medium">Price</label>
              <input
                type="number"
                min={0}
                className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="mb-1 font-medium">Quantity</label>
              <input
                type="number"
                min={0}
                className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Category</label>
            <select
              className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Choose category</option>
              <option value="1">Phones</option>
              <option value="2">Laptops</option>
              <option value="3">Accessories</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Product Photos</label>
            <Upload
              listType="picture"
              beforeUpload={() => false}
              multiple
              onChange={(info) => setImages(info.fileList)}
              fileList={images}
            >
              <Button icon={<UploadOutlined />}>Add Photos</Button>
            </Upload>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              Add Product
            </button>
            <button
              type="reset"
              className="flex-1 border border-black px-6 py-3 rounded-xl hover:bg-gray-100 transition"
              onClick={() => {
                setName("");
                setDescription("");
                setPrice(undefined);
                setQuantity(undefined);
                setCategory("");
                setImages([]);
              }}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
