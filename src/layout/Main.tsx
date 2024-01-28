import { Outlet, ScrollRestoration } from "react-router-dom";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/footer/Footer";

const Main = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
        <ScrollRestoration />
        <Footer />
      </Container>
    </>
  );
};

export default Main;
