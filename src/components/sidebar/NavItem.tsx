import { NavLink } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import type { NavLinkItem } from "../../types/types";
import Submenu from "./Submenu";

type Props = {
  link: NavLinkItem;
  activeTab: number;
  onSelect: (id: number) => void;
  onSubSelect: () => void;
};

const NavItem = ({ link, activeTab, onSelect, onSubSelect }: Props) => {
  return (
    <li key={link.id} className="text-[18px]">
      <NavLink
        onClick={() => onSelect(link.id)}
        to={link.path}
        className={twMerge(
          "flex group items-center justify-between p-5 rounded-xl text-sm  duration-300",
          link.id === activeTab
            ? "bg-[#243C7B] text-white"
            : "hover:bg-[#243C7B] hover:text-white text-[#787486]"
        )}
      >
        <span className="flex gap-3 items-center">
          <img
            className={
              link.id !== activeTab
                ? "brightness-0 duration-300"
                : "brightness-100 duration-300"
            }
            src={link.icon}
            alt={link.title}
          />
          {link.title}
        </span>

        {link.subdomains && <IoIosArrowDown />}
      </NavLink>

      {link?.subdomains && link?.subdomains.length > 0 && (
        <Submenu
          subdomains={link.subdomains}
          visible={activeTab === link.id}
          onSubClick={onSubSelect}
        />
      )}
    </li>
  );
};

export default NavItem;
