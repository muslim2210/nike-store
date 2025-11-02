import Link from "next/link";
import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Wrapper from "./Wrapper";
import Image from "next/image";

const leftMenu = [
  {
    id: 1,
    name: "find a store",
  },
  {
    id: 2,
    name: "become a partner",
  },
  {
    id: 3,
    name: "sign up for email",
  },
  {
    id: 4,
    name: "send us feedback",
  },
  {
    id: 5,
    name: "student discount",
  },
];

const midMenu = [
  {
    id: 1,
    name: "Order Status",
  },
  {
    id: 2,
    name: "delivery",
  },
  {
    id: 3,
    name: "returns",
  },
  {
    id: 4,
    name: "payment options",
  },
  {
    id: 5,
    name: "contact us",
  },
];

const rightMenu = [
  {
    id: 1,
    name: "news",
  },
  {
    id: 2,
    name: "careers",
  },
  {
    id: 3,
    name: "investors",
  },
  {
    id: 4,
    name: "sustainability",
  },
];

const SocialMenu = [
  {
    id: 1,
    icon: <FaFacebookF />,
    link: "https://facebook.com",
  },
  {
    id: 2,
    icon: <FaTwitter />,
    link: "https://facebook.com",
  },
  {
    id: 3,
    icon: <FaYoutube />,
    link: "https://facebook.com",
  },
  {
    id: 4,
    icon: <FaInstagram />,
    link: "https://facebook.com",
  },
];

const BottomMenu = [
  {
    id: 1,
    name: "guides",
  },
  {
    id: 2,
    name: "terms of sale",
  },
  {
    id: 3,
    name: "terms of use",
  },
  {
    id: 4,
    name: "privacy policy",
  },
];

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-14 pb-3">
      <Wrapper className="flex justify-between flex-col lg:flex-row gap-[50px] lg:gap-0">
        <div className="hidden lg:block">
          <Image
            src="/logo-nike.png"
            alt=""
            width={100}
            height={100}
            priority
          />
        </div>
        {/* LEFT START */}
        <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col md:flex-row justify-center">
          {/* MENU START */}
          <div className="flex flex-col gap-3 shrink-0">
            {leftMenu.map((item) => (
              <div
                className="font-oswald font-medium uppercase text-sm cursor-pointer"
                key={item.id}
              >
                {item.name}
              </div>
            ))}
          </div>
          {/* MENU END */}

          {/* NORMAL MENU START */}
          <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] shrink-0">
            {/* MENU START */}
            <div className="flex flex-col gap-3">
              <div className="font-oswald font-medium uppercase text-sm">
                get help
              </div>
              {midMenu.map((item) => (
                <div
                  className="text-sm text-white/[0.5] hover:text-white cursor-pointer capitalize"
                  key={item.id}
                >
                  {item.name}
                </div>
              ))}
            </div>
            {/* MENU END */}

            {/* MENU START */}
            <div className="flex flex-col gap-3">
              <div className="font-oswald font-medium uppercase text-sm">
                About nike
              </div>
              {rightMenu.map((item) => (
                <div
                  className="text-sm text-white/[0.5] hover:text-white cursor-pointer capitalize"
                  key={item.id}
                >
                  {item.name}
                </div>
              ))}
            </div>
            {/* MENU END */}
          </div>
          {/* NORMAL MENU END */}
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex gap-4 justify-center lg:justify-start">
          {SocialMenu.map((item) => (
            <Link
              href={item.link}
              key={item.id}
              className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
            >
              {item.icon}
            </Link>
          ))}
        </div>
        {/* RIGHT END */}
      </Wrapper>
      <Wrapper className="flex justify-between mt-10 flex-col md:flex-row gap-[10px] md:gap-0">
        {/* LEFT START */}
        <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer text-center md:text-left">
          © 2025 Nike, Inc. Bukhori Muslim All Rights Reserved
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex gap-2 md:gap-5 text-center md:text-left flex-wrap justify-center">
          {BottomMenu.map((item) => (
            <div
              className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer capitalize"
              key={item.id}
            >
              {item.name}
            </div>
          ))}
        </div>
        {/* RIGHT END */}
      </Wrapper>
    </footer>
  );
};

export default Footer;
