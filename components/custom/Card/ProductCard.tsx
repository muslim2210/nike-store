"use client";
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/types/model";
import { FaRegHeart } from "react-icons/fa";
import { formatRupiah } from "@/hooks/formatRupiah";
// import HeartWishlist from "./HeartWishlist";

interface ProductCardProps {
  product: ProductType;
  // updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 flex flex-col gap-1"
      key={product.id}
    >
      <Link href={`/products/${product.id}`}>
        <div className="">
          {product.images.length > 0 && (
            <Image
              width={500}
              height={500}
              src={product.images[0]}
              alt=""
              priority
              className="h-[180px] md:h-[250px] lg:h-[300px] md:w-full object-cover"
            />
          )}
        </div>
      </Link>
      <div className="py-4 px-2 flex flex-col gap-2">
        <h2 className="text-sm md:text-lg font-medium text-primaryBlack">
          {product.title}
        </h2>
        <span className="text-xs md:text-sm text-slate-500">
          {product.collection?.name}
        </span>
        <div className="flex items-center justify-between">
          <p className="mr-2 text-sm md:text-lg font-semibold">
            Rp. {formatRupiah(product.price)}
          </p>
          <FaRegHeart className="text-red-500 h-6 w-6"/>
          {/* <HeartWishlist
            product={product}
            updateSignedInUser={updateSignedInUser}
          /> */}

        </div>
      </div>
    </div>
  );
};

export default ProductCard;
