"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import Image from "next/image";
// import MenuMobile from "../section/MenuMobile";
import MenuLink from "./Menu";
import SearchModal from "./SearchModal";
import { useCustomerAuth } from "@/stores/useCustomerAuth";
// import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import LoginRegisterDialog from "./LoginRegisterDialog";
import MenuMobile from "../section/MenuMobile";
import UserButton from "../custom/Button/UserButton";
const Header = () => {

  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
 const [open, setOpen] = useState(false);

  const router = useRouter();

  const controlNavbar = () => {
    if (window.scrollY > 500) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const auth = useCustomerAuth();

  const handleWishlist = () => {
    if (auth.customer) {
      router.push("/wishlist"); 
    } else {
      if (!auth.customer) {
      setOpen(true); 
      return;
      }
    }
  };

  return (
    <>   
      <header
        className={`w-full h-[50px] md:h-20 bg-white flex items-center justify-center z-20 shadow-sm sticky top-0 transition-transform duration-300 ${show}`}
      >
        <Wrapper className="h-[60px] flex justify-between items-center">
          <div className="flex-1">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="logo"
                width={100}
                height={100}
                priority
                className="w-10 md:w-[60px]"
              />
            </Link>
          </div>
          <div className="flex-1 hidden lg:flex justify-center">
            <MenuLink
              showCatMenu={showCatMenu}
              setShowCatMenu={setShowCatMenu}
            />
          </div>

          <div className="flex-1 gap-3 flex justify-end items-center">
            <SearchModal />
            {mobileMenu && (
              <MenuMobile
                showCatMenu={showCatMenu}
                setShowCatMenu={setShowCatMenu}
                setMobileMenu={setMobileMenu}
              />
            )}
            <div className="flex flex-row gap-1 items-center text-black relative">
              {/* Icon start */}
              <button
                onClick={handleWishlist}
                className="w-8 h-8 text-[0px] rounded-full flex justify-center items-center hover:bg-black/5 cursor-pointer"
              >
                <IoMdHeartEmpty size={22} />
              </button>
              {/* Icon end */}

              {/* Icon start */}
              <Link href="/cart">
                <div className="w-8 h-8 rounded-full flex justify-center items-center hover:bg-black/5 cursor-pointer relative">
                  <BsCart className="text-[20px]" />
                  <div className="h-[18px] min-w-[18px] md:min-w-4 rounded-full bg-red-600 absolute top-0 left-5 md:left-6 text-white text-[12px] flex justify-center items-center px-1 py-0.5">
                    12
                  </div>
                </div>
              </Link>
              {/* Icon end */}

              <div className="ml-2">
                <UserButton />
              </div>

              {/* Mobile icon start */}
              <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex lg:hidden justify-center items-center hover:bg-black/5 cursor-pointer relative -mr-2">
                {mobileMenu ? (
                  <VscChromeClose
                    className="text-[16px]"
                    onClick={() => setMobileMenu(false)}
                  />
                ) : (
                  <BiMenuAltRight
                    className="text-[20px]"
                    onClick={() => setMobileMenu(true)}
                  />
                )}
              </div>
              {/* Mobile icon end */}
            </div>
          </div>
        </Wrapper>
      </header>

      <LoginRegisterDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Header;
