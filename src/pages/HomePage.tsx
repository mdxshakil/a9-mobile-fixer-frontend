import Header from "../components/Header";
import FaqSection from "../components/home/FaqSection";

import OurServices from "../components/home/OurServices";
import UpcomingService from "../components/home/UpcomingService";

const HomePage = () => {
  return (
    <div>
      <Header />
      <OurServices />
      <UpcomingService />
      <FaqSection />
    </div>
  );
};

export default HomePage;
