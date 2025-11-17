"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Wrapper from "../layout/Wrapper";
import { useFetch } from "@/hooks/useFetch";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { ProductType } from "@/types/model";
import ProductCard from "../custom/Card/ProductCard";

const ProductList = () => {
  const { data: products, loading } = useFetch({
        url: "/api/products",
        params: {
          fields: ["id", "title", "price", "images"],
        }
    });
  
      const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1280 },
          items: 4,
          partialVisibilityGutter: 40,
        },
        tablet: {
          breakpoint: { max: 1280, min: 640 },
          items: 3,
          partialVisibilityGutter: 30,
        },
        mobile: {
          breakpoint: { max: 640, min: 0 },
          items: 2,
          partialVisibilityGutter: 20,
        },
      };
  
  return (
    <Wrapper>
      <div className="my-16 relative">
        <div className="text-xl md:text-2xl font-bold mb-5">
          All Featured Products
        </div>
        {loading ? (
            <Button variant="outline" disabled size="sm">
              <Spinner />
              Please wait
            </Button>
          ) : products && products.length > 0 ? (
            <Carousel
              responsive={responsive}
              containerClass="-mx-[10px]"
              itemClass="px-1 md:px-3 mt-5"
              infinite={true}
            >
              {(products ?? []).map((product: ProductType) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Carousel>
          ) : (
            <div className="text-gray-500 mt-5">No products found.</div>
          )}
      </div>
    </Wrapper>
  );
};

export default ProductList;
