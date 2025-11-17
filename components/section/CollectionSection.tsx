'use client'
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Wrapper from "../layout/Wrapper";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { CollectionType } from "@/types/model";
import ButtonGroupCarousel from "../custom/Button/ButtonGroupCarousel";

const CollectionSection = () => {
  const { data: collections, loading } = useFetch({
      url: "/api/collections",
      params: {
        fields: ["id", "name", "image"],
        all: true
      }
  });

    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1280 },
        items: 3,
        partialVisibilityGutter: 40,
      },
      tablet: {
        breakpoint: { max: 1280, min: 640 },
        items: 2,
        partialVisibilityGutter: 30,
      },
      mobile: {
        breakpoint: { max: 640, min: 0 },
        items: 1,
        partialVisibilityGutter: 20,
      },
    };


  return (
    <Wrapper className="my-16 relative">
      <div className="text-xl md:text-2xl font-bold mb-5">
        Shop By Collections 
      </div>
      {
        loading ? (
        <Button variant="outline" disabled size="sm">
          <Spinner />
          Please wait
        </Button>
      ) : ( 
        <Carousel
          responsive={responsive}
          containerClass="-mx-[10px]"
          itemClass="px-[10px] mt-5"
          arrows={false}
          renderButtonGroupOutside={true}
          customButtonGroup={<ButtonGroupCarousel />}
          infinite={true}
        >
          {collections && collections.map((collection: CollectionType) => (
            <div key={collection.id} className="flex flex-col gap-3">             
              <Link
                href={`/collections/${collection.id}`}
                key={collection.id}
                className=""
              >
                <div className="relative aspect-4/3 w-full max-w-[400px] overflow-hidden rounded-lg">
                  {collection.image && (
                    <Image
                      key={collection.id}
                      src={collection.image}
                      alt={collection.name}
                      fill
                      priority
                      className="object-cover object-center"
                    />
                  )}
                </div>
              </Link>
              <h2 className="text-primaryBlack font-medium text-2xl oswald">
                {collection.name}
              </h2>
            </div>
          ))}
        </Carousel>
      )}
    </Wrapper>
  )
}

export default CollectionSection
