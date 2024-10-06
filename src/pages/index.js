import ProductCard from "@/components/productCard";
import React from "react";
import { useSelector } from "react-redux";
import { useFetchAllProducts } from "@/hooks/useFetchAllProducts.hook";
import ProductCardSkeleton from "@/skeletons/productCard.skeleton";

const Home = () => {
  useFetchAllProducts();
  const { loading } = useSelector((state) => state.products);
  const { allProducts } = useSelector((state) => state.products);

  return (
    <>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6  gap-4">
        {loading
          ? [...Array(12)].map((_, idx) => <ProductCardSkeleton key={idx} />)
          : allProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </>
  );
};

export default Home;
