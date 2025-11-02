"use client";
import React, { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    title: "New Styles on Sale: Up to 40% Off",
    subtitle: "Shop All our New Markdowns",
  },
  {
    id: 2,
    title: "Students Now Get 10% Off",
    subtitle: "Learn Now",
  },
  {
    id: 3,
    title: "Move, Shop, Customise & Celebrate With Us.",
    subtitle: "Join Us",
  },
  {
    id: 4,
    title: "Free Delivery.",
    subtitle: "Applies to orders of Rp3.000.000 or more. View details",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === data.length - 1 ? 0 : prevSlide + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full bg-primaryGray flex flex-col items-center py-4">
      <h1 className="text-base md:text-xl text-primaryBlack text-center font-medium">
        {data[currentSlide].title}
      </h1>
      <span className="text-xs md:text-sm text-primaryBlack text-center underline max-w-[300px] md:max-w-[900px] mx-auto">
        {data[currentSlide].subtitle}
      </span>
    </div>
  );
};

export default Slider;
