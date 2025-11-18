import { useCustomerAuth } from "@/stores/useCustomerAuth";
import { FaUser } from "react-icons/fa";
import { RiShoppingCartFill } from "react-icons/ri";

type Props = {
  title: string;
  totalProduct: number;
}

export default function HeaderSection({ title, totalProduct }: Props) {
  const auth = useCustomerAuth();

  return (
    <div className="flex items-center justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
        <div className="mt-1 flex flex-col md:flex-row gap-1 flex-wrap">
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

        <span className="sm:ml-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Checkout
          </button>
        </span>

      </div>
    </div>
  )
}
