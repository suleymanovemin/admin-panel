import { IoAdd } from "react-icons/io5";

const Heading = ({
  setIsAddModalOpen,
}: {
  setIsAddModalOpen: (open: boolean) => void;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="mb-1 text-2xl font-medium">News & Announcements</h2>
        <span className="text-sm text-[#787486]">210 Posts</span>
      </div>
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="bg-[#243C7B] cursor-pointer text-white text-base font-medium px-4 py-2 rounded-4xl flex items-center gap-2"
      >
        <div className="size-5 bg-[#3D5DB2]  rounded-full flex items-center justify-center">
          <IoAdd className="text-white" />
        </div>
        <span className="text-sm">Add News or Announcement</span>
      </button>
    </div>
  );
};

export default Heading;
