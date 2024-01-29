import { Outlet, ScrollRestoration } from "react-router-dom";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/footer/Footer";
import ScrollToTop from "../components/buttons/ScrollToTop";

const Main = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
        <ScrollRestoration />
        <ScrollToTop />
        <Footer />
      </Container>
    </>
  );
};

export default Main;
