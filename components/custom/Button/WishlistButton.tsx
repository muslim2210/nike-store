"use client";
import { Heart } from "lucide-react";
import { useWishlist } from "@/stores/useWishlist";
import { useCustomerAuth } from "@/stores/useCustomerAuth";
import LoginRegisterDialog from "@/components/layout/LoginRegisterDialog";
import { useState } from "react";


export default function WishlistButton({ productId }: { productId: number }) {
  const { isWishlisted, toggleWishlist, hydrated } = useWishlist();
  const { customer } = useCustomerAuth();

  const [open, setOpen] = useState(false);

  if (!hydrated) return null;          // tunggu zustand siap

  const active = isWishlisted(productId);

  const handleClick = () => {
    if (!customer) {
      setOpen(true);
      return;
    }

    toggleWishlist(productId);        
  };

  return (
    <>
      <button onClick={handleClick}>
        <Heart
          className={`cursor-pointer transition w-4 h-4 md:w-5 md:h-5 ${
            active ? "text-red-500 fill-red-500" : "text-gray-400"
          }`}
        />
      </button>

      <LoginRegisterDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
