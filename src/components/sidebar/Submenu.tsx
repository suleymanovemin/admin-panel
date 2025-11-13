import { NavLink } from "react-router-dom";
import type { Subdomain } from "../../types/types";

type Props = {
  subdomains: Subdomain[];
  visible: boolean;
  onSubClick: () => void;
};

const Submenu = ({ subdomains, visible, onSubClick }: Props) => {
  return (
    <ul
      className={`grid transition-all duration-300 ease-in-out overflow-hidden
    border border-[#F7F7F7] rounded-xl mt-1  shadow-[0px_0px_10.9px_0px_#EBEBEB40]
    ${
      visible
        ? "grid-rows-[1fr] opacity-100 p-5 gap-4"
        : "grid-rows-[0fr] opacity-0 p-0 gap-0"
    }
  `}
    >
      <div className="overflow-hidden flex flex-col gap-4">
        {subdomains.map((subdomain) => (
          <li key={subdomain.id}>
            <NavLink
              onClick={() => onSubClick()}
              to={subdomain.path}
              className="text-[#787486] text-sm [&.active]:text-[#243C7B] [&.active]:text-medium duration-300"
            >
              {subdomain.title}
            </NavLink>
          </li>
        ))}
      </div>
    </ul>
  );
};

export default Submenu;
