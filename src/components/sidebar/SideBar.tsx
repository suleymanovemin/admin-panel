import Logo from "./Logo";
import { navLinks } from "../../constants/routes";
import { useState } from "react";
import NavItem from "./NavItem";
import SettingsItem from "./SettingsItem";
import UserProfile from "./UserProfile";

const SideBar = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const setId = (id: number) => {
    setActiveTab(id);
  };

  return (
    <header className="border-r border-[#F7F7F7] w-[320px] h-[calc(100vh-100px)]">
      <Logo />
      <nav className="mt-6 px-[19px] h-full pt-8 pb-6 flex flex-col justify-between">
        <ul className="flex flex-col gap-1">
          {navLinks?.map((link) => (
            <NavItem
              key={link.id}
              link={link}
              activeTab={activeTab}
              onSelect={setId}
              onSubSelect={() => setId(1)}
            />
          ))}
        </ul>

        <div className="h-full flex flex-col justify-end">
          <SettingsItem />

          <UserProfile name="Khayal Ahmadli" username="khahmadli" />
        </div>
      </nav>
    </header>
  );
};

export default SideBar;
