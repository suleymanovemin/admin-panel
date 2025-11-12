import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import type { FiltersType } from "../../types/types";

type Option = {
  value: string;
  label: string;
  status?: boolean;
};
type Props = {
  options: Option[];
  label: string;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  filterKey: string;
  type?: "standart" | "withStatus";
};

const Select = ({
  options,
  label,
  setFilters,
  filterKey,
  type = "standart",
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option>(
    type === "withStatus" ? options[0] : { value: "", label }
  );
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setFilters((prev) => ({ ...prev, [filterKey]: option.value }));
    setIsOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={selectRef}
      onClick={handleOpen}
      className="border relative border-[#E5E7EB] rounded-[10px] p-2 w-max min-w-[150px] flex items-center justify-between text-[#0A0A0A] cursor-pointer select-none"
    >
      {type === "withStatus" && selectedOption?.status !== undefined && (
        <div
          className={twMerge(
            "size-2 rounded-full mr-2",
            selectedOption.status ? "bg-[#1DB100]" : "bg-[#D82C2C]"
          )}
        ></div>
      )}

      {type === "withStatus"
        ? selectedOption.label
        : selectedOption.label || label}
      <IoIosArrowDown
        className={twMerge(
          "text-[#787486] duration-150",
          isOpen && "-rotate-180"
        )}
      />

      {/* Dropdown */}
      <ul
        className={twMerge(
          "absolute top-[120%] left-0 w-full z-50 bg-white border border-[#E5E7EB] rounded-[10px] p-3 shadow-[0_0_10.9px_0_#EBEBEB40] flex flex-col gap-4 duration-200 invisible opacity-0 ",
          isOpen && "visible opacity-100"
        )}
      >
        {options?.map((option: Option, index) => (
          <li
            onClick={() => handleSelect(option)}
            key={index}
            className="text-[#0A0A0A] flex items-center gap-2 text-sm font-medium hover:text-[#243C7B] duration-300 "
          >
            {(option.status === true || option.status === false) && (
              <div
                className={twMerge(
                  "size-2 rounded-full",
                  option.status ? "bg-[#1DB100]" : "bg-[#D82C2C]"
                )}
              ></div>
            )}
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
