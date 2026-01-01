"use client";
import SideBarCategoryBox from "@/components/SideBarCategoryBox";
import ProductCard from "@/components/ProductCard";
import { Pagination } from "antd";
import RecomendationProductList from "@/components/RecomendationProductList";
import FilterProductsBar from "@/components/FilterProductsBar";

export default function Home() {
  return (
    <main className="">
      <section>
        <div className="bg-[url('/hero_img.webp')] bg-cover bg-center h-[400px] flex items-center justify-center">
          <h1 className=" text-9xl text-white">Shoppy</h1>
        </div>
      </section>
      <div className="bg-white mx-15 rounded-3xl p-5 -mt-10">
        <section>
          <h2 className="text-3xl ">Give all you need</h2>
          <FilterProductsBar></FilterProductsBar>
          <div className="flex">
            <SideBarCategoryBox></SideBarCategoryBox>
            <div className="grid grid-cols-3 gap-5 w-full p-5 ">
              <ProductCard></ProductCard>
              <ProductCard></ProductCard>
              <ProductCard></ProductCard>
              <ProductCard></ProductCard>
              <ProductCard></ProductCard>
              <ProductCard></ProductCard>
              <Pagination className=""></Pagination>
            </div>
          </div>
        </section>
        <RecomendationProductList></RecomendationProductList>
      </div>
    </main>
  );
}
