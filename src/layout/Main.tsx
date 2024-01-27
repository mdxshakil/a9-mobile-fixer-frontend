import { Outlet, ScrollRestoration } from "react-router-dom";
import Container from "../components/Container";
import Navbar from "../components/Navbar";

const Main = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
        <ScrollRestoration />
      </Container>
    </>
  );
};

export default Main;
