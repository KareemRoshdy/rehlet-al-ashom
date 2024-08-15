"use client";

import qs from "query-string";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { Search } from "lucide-react";
import { Input } from "./ui/input";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, router, pathname]);

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 right-3 text-slate-600" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[300px] pr-9 rounded-full focus-visible:ring-slate-200"
        placeholder="إبحث عن الدورة"
      />
    </div>
  );
};

export default SearchInput;
