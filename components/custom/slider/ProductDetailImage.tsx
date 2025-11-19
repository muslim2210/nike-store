'use client'
// import Image from 'next/image';
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface ProductDetailImageProps {
  productMedia: string[]
}

const ProductDetailImage = ({ productMedia }: ProductDetailImageProps) => {
  return (
    <div className="text-white text-[20px] w-full lg:max-w-[600px] mx-auto sticky top-[50px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {productMedia?.map((media, index) => (
          <div key={index}>
            <img src={media} alt={media} className='rounded-[2px]'/>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default ProductDetailImage
