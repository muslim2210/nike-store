"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Wrapper from "./Wrapper";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";


const SearchModal = () => {

  const [query, setQuery] = useState("");

  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex items-center relative">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="hidden md:flex border px-2 py-1 md:w-[200px] text-sm rounded-full bg-primaryGray"
          />
          <Search className="text-primaryBlack w-5 h-5 ml-2 cursor-pointer absolute right-3 hover:text-primaryRed" />
        </div>
        {/* <button className="md:hidden flex items-center relative">
            <Search className="text-primaryBlack w-5 h-5 cursor-pointer absolute right-1" />
          </button> */}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white dark:bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
        </AlertDialogHeader>
        <Wrapper className="flex items-center md:justify-between">
          <Image
            src="/logo.svg"
            alt="logo"
            width={100}
            height={100}
            priority
            className="hidden md:block w-10 md:w-[60px]"
          />

          <div className="flex items-center relative mt-5 md:mt-0 lg:mr-2">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                router.refresh();
              }}
              placeholder="Search..."
              className="px-4 py-2 w-[250px] md:w-[350px] lg:w-[700px] text-sm rounded-full bg-primaryGray"
            />
            <AlertDialogAction className="bg-trasparent hover:bg-trasparent relative">
              <button
                disabled={query === ""}
                onClick={() => {
                  router.push(`/search/${query}`);
                  router.refresh();
                }}
                className="flex items-center"
              >
                <Search className="text-primaryBlack w-5 h-5 ml-2 cursor-pointer absolute right-10 hover:text-primaryRed" />
              </button>
            </AlertDialogAction>
          </div>

          <AlertDialogCancel asChild>
            <span className="hidden md:block cursor-pointer hover:text-primaryRed">
              Close
            </span>
          </AlertDialogCancel>
        </Wrapper>
        <div className="flex items-center justify-center mt-5">
          <div className="text-primaryBlack w-[300px] lg:w-[700px]">
            <h1 className="text-sm">Popular Search Terms</h1>
            
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SearchModal;
