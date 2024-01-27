import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import { Outlet, ScrollRestoration } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Sidebar />
        <Outlet />
        <ScrollRestoration />
      </Container>
    </>
  );
};

export default Dashboard;
