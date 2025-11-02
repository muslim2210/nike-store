"use client";
import { CollectionType } from "@/types/model";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import api from "@/lib/axios";

type Props = {
  showCatMenu: boolean;
  setShowCatMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuLink = ({ showCatMenu, setShowCatMenu }: Props) => {
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState<CollectionType[]>([]);

const fetchCollections = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/collections");
      console.info("[collections_GET]", res);
      setCollections(res.data.data as CollectionType[]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(err: any) {
      console.error("[collections_GET]", err)
      toast.error(err.message || err || "Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <ul className="hidden md:flex items-center gap-5 font-medium text-black text-base p-4">
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
                {collections?.map((collection) => {
                  return (
                    <Link
                      key={collection.id}
                      href={`/collections/${collection.id}`}
                      onClick={() => setShowCatMenu(false)}
                    >
                      <div className="h-12 flex justify-between items-center px-5 hover:bg-black/[0.03] rounded-md">
                        {collection.title}
                        <span className="opacity-50 text-sm">
                          {`(${collection?.products?.length})`}
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
