import type { FiltersType } from "../../types/types";
import Search from "./Search";
import Select from "./Select";

const Filters = ({
  setFilters,
}: {
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
}) => {
  return (
    <div className="flex items-center gap-4 border border-[#F7F7F7] rounded-xl mt-1 mb-4 shadow-[0px_0px_10.9px_0px_#EBEBEB40] p-6">
      <Select
        options={[
          {
            label: "All Posts",
            value: "all",
          },
          {
            label: "News",
            value: "news",
          },
          {
            label: "Announcements",
            value: "announcements",
          },
        ]}
        label="All Posts"
        filterKey="category"
        setFilters={setFilters}
      />
      <Select
        options={[
          {
            label: "Active",
            value: "active",
            status: true,
          },
          {
            label: "Inactive",
            value: "inactive",
            status: false,
          },
        ]}
        label="All Status"
        filterKey="status"
        setFilters={setFilters}
      />
      <Search setFilters={setFilters} />
    </div>
  );
};

export default Filters;
