"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useRef } from "react";

export function ProjectSearch() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const pathname = usePathname();
  const { push } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== query) {
      inputRef.current.value = query;
    }
  }, [query]);

  /*   Bounded callback */
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    push(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <input
      type="search"
      placeholder="Search projects..."
      defaultValue={query}
      ref={inputRef}
      onChange={(event) => handleSearch(event.target.value)}
    />
  );
}

