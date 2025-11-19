import { useCustomerAuth } from "@/stores/useCustomerAuth";
import { FaUser } from "react-icons/fa";
import { RiShoppingCartFill } from "react-icons/ri";

type Props = {
  title: string;
  totalProduct: number;
  children?: React.ReactNode;
}

export default function HeaderSection({ title, totalProduct, children }: Props) {
  const auth = useCustomerAuth();

  return (
    <div className="flex items-center justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
        <div className="mt-1 flex flex-col md:flex-row gap-1 md:gap-4 flex-wrap">
          <div className="md:mt-2 flex items-center text-sm text-gray-500">
            <FaUser aria-hidden="true" className="mr-1.5 w-4 h-4 shrink-0 text-gray-400" />
            {auth.customer?.name || "User"}
          </div>
          <div className="md:mt-2 flex items-center text-sm text-gray-500">
            <RiShoppingCartFill aria-hidden="true" className="mr-1.5 w-4 h-4 shrink-0 text-gray-400" />
            Total Product : {totalProduct || 0}
          </div>
        </div>
      </div>
      <div className="flex h-full lg:mt-0 lg:ml-4">
        {children}
      </div>
    </div>
  )
}
