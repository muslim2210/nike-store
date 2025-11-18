import {  IoChevronBack } from "react-icons/io5";

const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="
        absolute left-0 top-1/2 -translate-y-1/2
        w-10 h-10 flex items-center justify-center
        bg-white/70 backdrop-blur-sm border border-black/10
        rounded-full shadow hover:bg-black/10 transition
        z-10
      "
    >
      <IoChevronBack size={22} />
    </button>
  );
};

export default CustomLeftArrow;