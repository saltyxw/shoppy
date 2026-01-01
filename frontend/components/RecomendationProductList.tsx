import ProductCard from "./ProductCard";
export default function RecomendationProductList() {
  return (
    <section>
      <h2 className="text-4xl text-center p-5">Explore our reccomendation</h2>
      <div className="flex flex-nowrap gap-10 overflow-x-auto pb-4 scroll-smooth ">
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
      </div>
    </section>
  );
}
