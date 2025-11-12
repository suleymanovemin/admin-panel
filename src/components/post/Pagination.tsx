import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Select, MenuItem, type SelectChangeEvent } from "@mui/material";
import type { PaginationProps } from "../../types/types";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setPostsPerPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    setPostsPerPage(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex items-center justify-center border-t border-gray-200 pt-4">
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <IoIosArrowBack size={18} />
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageClick(i + 1)}
            className={`px-3 py-1 rounded-full cursor-pointer text-sm font-medium ${currentPage === i + 1
              ? "bg-[#243C7B] text-white"
              : "hover:bg-gray-100 text-gray-700"
              }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <IoIosArrowForward size={18} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <Select
          value={postsPerPage}
          onChange={handleSelectChange}
          size="small"
          sx={{
            height: 35,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ECECEC",
              borderRadius: 6,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#243C7B",
            },
          }}
        >
          {[3, 5, 10, 20].map((num) => (
            <MenuItem key={num} value={num}>
              {num} / Page
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default Pagination;
