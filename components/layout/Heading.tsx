"use client";
import Wrapper from "./Wrapper";

type Props = {
  span: string;
  title: string;
  subtitle: string;
};

const Heading = ({ span, title, subtitle }: Props) => {
  return (
    <Wrapper>
      {/* heading and paragaph start */}
      <div className="max-w-[800px] mx-auto my-[30px] md:my-[70px]">
        <div className="flex flex-col md:gap-y-1">
          <span className="text-primaryBlack font-medium text-lg mb-0 text-center">
            {span}
          </span>
          <h1 className="text-center text-[44px] md:text-[56px] lg:text-[64px] mb-4 md:mb-6 font-black tracking-tighter leading-none oswald uppercase">
            {title}
          </h1>
          <h5 className="text-primaryBlack font-medium text-base md:text-xl text-center">
            {subtitle}
          </h5>
        </div>
        <div className="flex justify-center items-center gap-5 mt-5">
          <button
            onClick={() => {
              window.location.href = "/products";
            }}
            className="bg-primaryBlack w-[100px] text-white text-lg font-medium px-4 py-2 rounded-full"
          >
            Buy It
          </button>
          <button className="bg-primaryBlack w-[100px] text-white text-lg font-medium px-4 py-2 rounded-full">
            Style It
          </button>
        </div>
      </div>
      {/* heading and paragaph end */}

      {/* products grid start */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div> */}
      {/* products grid end */}
    </Wrapper>
  );
};

export default Heading;
