"use client";
import React, { useState } from "react";
// import { MinusCircle, PlusCircle } from "lucide-react";
import { ProductType } from "@/types/model";
import useCart from "@/stores/useCart";
import { formatRupiah } from "@/hooks/formatRupiah";
import WishlistButton from "../Button/WishlistButton";

interface ProductCardProps {
  productInfo: ProductType;
}

const ProductInfo = ({ productInfo }: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    productInfo.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    productInfo.sizes[0]
  );

  const [quantity, setQuantity] = useState<number>(1);
  const allSizes = Array.from({ length: 9 }, (_, i) => String(36 + i));
  const cart = useCart();

  return (
    <div className="max-w-full lg:max-w-[400px]">
      {/* PRODUCT TITLE */}
      <div className="text-2xl md:text-[34px] mt-3 md:mt-0 font-semibold mb-2 leading-tight">
        {productInfo.title}
      </div>

      {/* PRODUCT SUBTITLE */}
      <div className="text-lg font-semibold mb-5">{productInfo.collection?.name}</div>

      {/* PRODUCT PRICE */}
      <div className="flex items-center  justify-between">
        <p className="mr-2 text-lg md:text-2xl font-semibold">
          {formatRupiah(productInfo.price)}
        </p>
      </div>

      <div className="text-md font-medium text-black/50">incl. of taxes</div>
      <div className="text-md font-medium text-black/50 mb-5">
        {`(Also includes all applicable duties)`}
      </div>

      {productInfo.colors.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-black/50">Colors:</p>
          <div className="flex flex-wrap gap-2">
            {productInfo.colors.map((color, index) => (
              <p
                key={index}
                className={`border rounded-md text-center font-medium py-2 px-3 cursor-pointer capitalize ${
                  selectedColor === color && "bg-black text-white"
                }`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCT SIZE RANGE START */}
      <div className="mb-10 mt-10">
        {/* HEADING START */}
        <div className="flex justify-between mb-2">
          <div className="text-md font-semibold">Select Size</div>
          <div className="text-md font-medium text-black/50 cursor-pointer">
            Select Guide
          </div>
        </div>
        {/* HEADING END */}

        {/* SIZE START */}
        <div id="sizesGrid" className="grid grid-cols-3 gap-2">
          {allSizes.map((size) => {
            const isAvailable = productInfo.sizes.includes(size);
            const isSelected = selectedSize === size;

            return (
              <div
                key={size}
                className={`
                  border rounded-md text-center font-medium py-3
                  ${isAvailable ? "cursor-pointer" : "cursor-not-allowed opacity-40"}
                  ${isAvailable && isSelected ? "bg-black text-white" : ""}
                `}
                onClick={() => {
                  if (isAvailable) setSelectedSize(size); // Hanya bisa klik jika tersedia
                }}
              >
                {size}
              </div>
            );
          })}
        </div>
        {/* SIZE END */}   
      </div>
      {/* PRODUCT SIZE RANGE END */}

      {/* /* === QUANTITY SELECTOR === */ }
      <div className="mb-8">
        <div className="text-md font-semibold mb-2">Quantity</div>

        <div className="flex items-center gap-4 w-full max-w-[180px]">
          <button
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="w-10 h-10 flex items-center justify-center border rounded-md text-xl font-semibold 
                      hover:bg-black hover:text-white transition-all active:scale-95"
          >
            −
          </button>

          <div className="w-12 text-center text-lg font-semibold">{quantity}</div>

          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="w-10 h-10 flex items-center justify-center border rounded-md text-xl font-semibold 
                      hover:bg-black hover:text-white transition-all active:scale-95"
          >
            +
          </button>
        </div>
      </div>

      {/* ADD TO CART BUTTON START */}
      <button
        className="w-full py-2 md:py-3 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
        onClick={() => {
          cart.addItem({
            item: productInfo,
            quantity,
            color: selectedColor,
            size: selectedSize,
          });
        }}
      >
        Add to Cart
      </button>
      {/* ADD TO CART BUTTON END */}

      {/* WHISHLIST BUTTON START */}
      <div className="w-full py-2 md:py-3 rounded-full border hover:border-black text-lg font-medium transition-transform flex items-center justify-center gap-2 mb-10">
        Favourite
        <WishlistButton productId={productInfo.id} />
      </div>
      {/* WHISHLIST BUTTON END */}

      <div className="text-md font-medium text-black/50 text-center max-w-[300px] mx-auto mb-10">
        This product is excluded from site promotions and discounts.
      </div>

      <div>
        <div className="text-lg font-semibold mb-5">Product Description</div>
        <div className="text-primaryBlack text-base text-pretty mb-5">
          {productInfo.description}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
