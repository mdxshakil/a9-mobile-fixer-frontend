import Footer from "../components/Footer";
import Header from "../components/Header";
import FeedBackSection from "../components/feedBackForm/FeedBack";
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
      <FeedBackSection />
      <Footer />
    </div>
  );
};

export default HomePage;
