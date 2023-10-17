import Header from "../components/Header";
import WhyChooseUs from "../components/why-choose-us/WhyChooseUs";
import FeedBackSection from "../components/feedBackForm/FeedBack";
import Footer from "../components/footer/Footer";
import FaqSection from "../components/home/FaqSection";

import OurServices from "../components/home/OurServices";
import UpcomingService from "../components/home/UpcomingService";
import LatestNewsSection from "../components/latestNews/LatestNewsSection";
import OurLocationSection from "../components/location/OurLocationSection";
import TestimonialSection from "../components/testimonial/TestimonialSection";

const HomePage = () => {
  return (
    <div>
      <Header />
      <OurServices />
      <UpcomingService />
      <WhyChooseUs />
      <LatestNewsSection />
      <FeedBackSection />
      <FaqSection />
      <OurLocationSection />
      <TestimonialSection />
      <Footer />
    </div>
  );
};

export default HomePage;
