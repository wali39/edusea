"use client";
import qs from "query-string";
import { Input } from "@/components/ui/input";
import { useDebunce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebunce(value);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("categoryId");
  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategory,
          title: debouncedValue,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  }, [debouncedValue, pathname, currentCategory, router]);
  return (
    <div className="relative">
      <Search className="absolute top-3 left-3 text-slate-500 " size={20} />
      <Input
        onChange={(e) => setValue(e.target.value)}
        placeholder="search course..."
        className="w-full md:w-[300px] pl-10 bg-slate-100 focus-visible:ring-slate-200 "
      />
    </div>
  );
};

export default SearchInput;
