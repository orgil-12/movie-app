"use client"

import { Film, SearchIcon, X } from "lucide-react";
import { Search } from "@/app/_components/Search";
import { Moon } from "@/app/_components/Moon";
import { MoonType } from "@/app/layout";
import Link from "next/link";
import { FilterGenre } from "./FilterGenre";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { SearchResultList } from "./SearchResultList";

export const Navigation = ({
  toggleTheme,
  theme,
}: {
  toggleTheme: () => void;
  theme: MoonType;
}) => {
  const searchParams = useSearchParams();
  const genreName = searchParams.get("genre_name");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event?.target.value);
  };

  return (
    <div className="py-2">
      <div className="w-[100%] flex  justify-between px-5 py-[11.5px] sm:hidden">
        {isSearching ? (
          <div className="w-[100%] flex justify-between items-center">
            <div className="flex gap-3 items-center relative">
              {!genreName && (
                <FilterGenre setIsSearching={setIsSearching} name="" />
              )}
              <div className="flex gap-[10px] px-3 items-center">
                <SearchIcon size={18} />
                <input
                  type="email"
                  placeholder="Search"
                  className="border-none focus:outline-0 focus:border-none bg-transparent"
                  onChange={handleChange}
                />
                {searchValue && (
                  <SearchResultList
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    setIsSearching={setIsSearching}
                  />
                )}
              </div>
            </div>
            <X size={20} onClick={() => setIsSearching(false)} />
          </div>
        ) : (
          <div className="w-[100%] flex items-center justify-between">
            <Link href="/">
              <h1 className="flex gap-2 italic font-bold text-[16px] text-[#4338CA]">
                <Film />
                <span>Movie Z</span>
              </h1>
            </Link>
            <div className="flex gap-3 ">
              <button
                className="border rounded-[10px] p-2"
                onClick={() => setIsSearching(true)}
              >
                <Search theme={theme} />
              </button>
              <button
                className="border rounded-[10px] p-2"
                onClick={toggleTheme}
              >
                <Moon theme={theme} />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="lg:m-auto hidden sm:flex justify-between px-5 py-[11.5px] sm:visible">
        <div className="w-[100%] flex items-center justify-between">
          <Link href="/">
            <h1 className="flex gap-2 italic font-bold text-[16px] text-[#4338CA]">
              <Film />
              <span>Movie Z</span>
            </h1>
          </Link>
          <div className="flex gap-3 relative ">
            {!genreName && (
              <FilterGenre setIsSearching={setIsSearching} name="Genre" />
            )}
            <div className="flex gap-[10px] px-4 py-1 items-center border rounded-lg sm:w-[250px] md:w-[375px] ">
              <SearchIcon size={18} color="gray" />
              <input
                type="email"
                placeholder="Search"
                className="border-none focus:outline-0 bg-transparent"
                onChange={handleChange}
              />
              {searchValue && (
                <SearchResultList
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  setIsSearching={setIsSearching}
                />
              )}
            </div>
          </div>
          <button className="border rounded-[10px] p-2" onClick={toggleTheme}>
            <Moon theme={theme} />
          </button>
        </div>
      </div>
    </div>
  );
};
