import ProductCard from "@/components/productCard";
import { useProduct } from "@/hooks/useProduct.hook";
import ProductCardSkeleton from "@/skeletons/productCard.skeleton";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const TShirt = () => {
  const { loading, categoryProducts } = useSelector((state) => state.products);

  const { fetchProductByCategory } = useProduct();

  useEffect(() => {
    fetchProductByCategory("tshirt");
  }, []);

  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6  gap-4">
      {loading
        ? [...Array(12)].map((_, idx) => <ProductCardSkeleton key={idx} />)
        : categoryProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
    </div>
  );
};

export default TShirt;
