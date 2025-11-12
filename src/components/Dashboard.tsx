import { Outlet } from "react-router-dom";
import SideBar from "./sidebar/SideBar";

const Dashboard = () => {
  return (
    <div className="flex justify-between">
      <SideBar />
      <div className="w-full h-full p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
