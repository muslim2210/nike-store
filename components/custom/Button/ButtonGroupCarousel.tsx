import React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ButtonGroupCarousel = ({ next, previous, goToSlide, ...rest }: any) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div
        className="carousel-button-group mb-4 gap-2 flex justify-end 
        items-center w-full absolute top-0 right-0"
      >
        <button
          className="block p-3 bg-slate-300 rounded-full"
          onClick={() => previous()}
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          onClick={() => next()}
          className="block p-3 bg-slate-300 rounded-full"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    );
  };

export default ButtonGroupCarousel
