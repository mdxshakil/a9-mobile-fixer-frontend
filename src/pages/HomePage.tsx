import Header from "../components/Header";
import WhyChooseUs from "../components/why-choose-us/WhyChooseUs";
import FeedBackSection from "../components/feedBackForm/FeedBack";
import FaqSection from "../components/home/FaqSection";
import OurServices from "../components/home/OurServices";
import UpcomingService from "../components/home/UpcomingService";
import LatestNewsSection from "../components/latestNews/LatestNewsSection";
import OurLocationSection from "../components/location/OurLocationSection";
import TestimonialSection from "../components/testimonial/TestimonialSection";
import UpcomingEventSection from "../components/UpcomingEventSection";

const HomePage = () => {
  return (
    <>
      <Header />
      <OurServices />
      <UpcomingService />
      <WhyChooseUs />
      <LatestNewsSection />
      <FeedBackSection />
      <FaqSection />
      <UpcomingEventSection />
      <OurLocationSection />
      <TestimonialSection />
    </>
  );
};

export default HomePage;
