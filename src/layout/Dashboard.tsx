import Navbar from "../components/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import { Outlet, ScrollRestoration } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Outlet />
      <ScrollRestoration />
    </div>
  );
};

export default Dashboard;
