import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Wrapper = ({ children, className }: Props) => {
  return (
    <div
      className={`w-full max-w-[1360px] px-3 md:px-7 lg:px-12 mx-auto ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
