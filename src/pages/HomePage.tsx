import Header from "../components/Header";
import FeedBackSection from "../components/feedBackForm/FeedBack";
import Footer from "../components/footer/Footer";
import FaqSection from "../components/home/FaqSection";

import OurServices from "../components/home/OurServices";
import UpcomingService from "../components/home/UpcomingService";
import TestimonialSection from "../components/testimonial/TestimonialSection";

const HomePage = () => {
  return (
    <div>
      <Header />
      <OurServices />
      <UpcomingService />
      <FaqSection />
      <FeedBackSection />
      <TestimonialSection />
      <Footer />
    </div>
  );
};

export default HomePage;
