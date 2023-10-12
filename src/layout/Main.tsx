import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Navbar";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <ScrollRestoration />
    </div>
  );
};

export default Main;
