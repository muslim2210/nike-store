"use client";
import { CollectionType } from "@/types/model";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useFetch } from "@/hooks/useFetch";

type Props = {
  showCatMenu: boolean;
  setShowCatMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuLink = ({ showCatMenu, setShowCatMenu }: Props) => {
  const { data: collections, loading } = useFetch({
    url: "/api/collections",
    params: {
      fields: ["id", "name"],
      withCount: true,
      all: true
    }
  });

  return (
    <ul className="flex flex-col md:flex-row md:items-center gap-5 lg:gap-8 font-medium text-black text-base p-4 border-gray-300 border-b md:border-none">
      <li className="cursor-pointer">
        <Link href="/">Home</Link>
      </li>
      <li className="cursor-pointer">
        <Link href="/products">Products</Link>
      </li>
      {
        loading ? (
          <Button variant="outline" disabled size="sm">
            <Spinner />
            Please wait
          </Button>
        ) : ( 
          <li
            className="cursor-pointer flex items-center gap-2 relative"
            onMouseEnter={() => setShowCatMenu(true)}
            onMouseLeave={() => setShowCatMenu(false)}
          >
            Collections
            <BsChevronDown size={14} />
            {showCatMenu && (
              <div className="bg-white absolute top-6 left-0 min-w-[250px] py-1 text-black shadow-lg">
                {collections.map((collection: CollectionType) => {
                  return (
                    <Link
                      key={collection.id}
                      href={`/collections/${collection.id}`}
                      onClick={() => setShowCatMenu(false)}
                    >
                      <div className="h-12 flex justify-between items-center px-5 hover:bg-black/3 rounded-md">
                        {collection.name}
                        <span className="opacity-50 text-sm">
                          {`(${collection?.products_count})`}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </li>
        )
      }

      <li className="cursor-pointer">
        <Link href={"/sign-in"}>Orders</Link>
      </li>
    </ul>
  );
};

export default MenuLink;
