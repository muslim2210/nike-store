"use client";
import React from "react";
import { IoMdClose } from "react-icons/io";
import MenuLink from "../layout/Menu";

export default function MenuMobile({
  setMobileMenu,
}: {
  showCatMenu: boolean;
  setShowCatMenu: (v: boolean) => void;
  setMobileMenu: (v: boolean) => void;
}) {

  const [showCatMenu, setShowCatMenu] = React.useState<boolean>(false);
  return (
    <div className="absolute top-[50px] left-0 w-full bg-white py-2 border-b-gray-200 z-30">
      {/* Menu Item */}
      <MenuLink showCatMenu={showCatMenu}setShowCatMenu={setShowCatMenu}/>
    </div>
  );
}
