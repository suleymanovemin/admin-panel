import { useState } from "react";
import type { FiltersType } from "../../types/types";

const Search = ({
  setFilters,
}: {
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
}) => {
  const [search, setSearch] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };
  return (
    <label htmlFor="search">
      <div className="border-[#E5E7EB] cursor-pointer border rounded-[10px] p-2 w-max min-w-[150px] flex items-center gap-2">
        <img src="/icons/search.svg" alt="search" />
        <input
          value={search}
          onChange={handleChange}
          placeholder="Search"
          id="search"
          type="text"
          className="outline-0"
        />
      </div>
    </label>
  );
};

export default Search;
