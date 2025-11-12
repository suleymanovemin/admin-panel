type Props = {
  label?: string;
  iconSrc?: string;
  className?: string;
  onClick?: () => void;
};

const SettingsItem = ({
  label = "Settings",
  iconSrc = "/icons/settings.svg",
  className = "",
  onClick,
}: Props) => {
  return (
    <div
      className={"flex items-center gap-3 p-5 rounded-xl text-sm hover:bg-[#243C7B] hover:text-white text-[#787486] mb-2 cursor-pointer" +
        className}
      onClick={onClick}
    >
      <img src={iconSrc} alt={label} />
      {label}
    </div>
  );
};

export default SettingsItem;
