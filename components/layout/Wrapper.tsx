import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Wrapper = ({ children, className }: Props) => {
  return (
    <div
      className={`w-full max-w-[1360px] px-5 md:px-10 mx-auto ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
