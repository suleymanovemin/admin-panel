import { twMerge } from "tailwind-merge";
import { LANGUAGES } from "../../../constants/enums";

const LanguageToggle = ({
  activeLang,
  onSwitch,
}: {
  activeLang: "AZ" | "EN";
  onSwitch: (lang: "AZ" | "EN") => void;
}) => {
  return (
    <div className="flex items-center gap-2 mb-3">
      <button
        onClick={() => onSwitch(LANGUAGES.AZ)}
        className={twMerge(
          "border cursor-pointer px-1.5 py-1 rounded-2xl duration-200 flex items-center gap-1",
          activeLang === LANGUAGES.AZ
            ? "bg-[#243C7B] text-white"
            : "border-gray-300"
        )}
      >
        <img src="/icons/az.svg" alt="" className="w-4 h-4" />
        AZ
      </button>
      <button
        onClick={() => onSwitch(LANGUAGES.EN)}
        className={twMerge(
          "border cursor-pointer px-1.5 py-1 rounded-2xl duration-200 flex items-center gap-1",
          activeLang === LANGUAGES.EN
            ? "bg-[#243C7B] text-white"
            : "border-gray-300"
        )}
      >
        <img src="/icons/en.svg" alt="" className="w-4 h-4" />
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
