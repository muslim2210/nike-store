import { useCustomerAuth } from "@/stores/useCustomerAuth";
import { useWishlist } from "@/stores/useWishlist";
import { FaUser } from "react-icons/fa";
import { RiShoppingCartFill } from "react-icons/ri";

type Props = {
  title: string;
}

export default function HeaderSection({ title }: Props) {
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
            Total Product : {useWishlist().wishlist.length || 0}
          </div>
        </div>
      </div>
      <div className="flex h-full lg:mt-0 lg:ml-4">
        <span className="hidden sm:block">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50"
          >
            Edit
          </button>
        </span>

        <span className="ml-3 hidden sm:block">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50"
          >
            View
          </button>
        </span>

        <span className="sm:ml-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Publish
          </button>
        </span>

      </div>
    </div>
  )
}
