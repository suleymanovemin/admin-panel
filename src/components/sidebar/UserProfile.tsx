import type { UserProfileType } from "../../types/types";

const UserProfile = ({
  name,
  username,
  avatarSrc = "/images/user.svg",
  className = "",
}: UserProfileType) => {
  return (
    <div
      className={
        "flex items-center gap-3 p-5 rounded-xl text-sm bg-[#243C7B] text-white " +
        className
      }
    >
      <img src={avatarSrc} alt={name} />
      <div>
        <p>{name}</p>
        {username && <span className="text-[#D1D1D1]">{username}</span>}
      </div>
    </div>
  );
};

export default UserProfile;
