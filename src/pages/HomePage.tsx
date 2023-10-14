import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Accordion from "../components/home/Accordion";
import AccordionImg from "../assets/accordion-image.jpg";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center py-6">
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </div>
      <div className="flex items-center justify-center ">
        <div className="py-12">
          <h1 className="text-center text-2xl md:text-3xl font-bold mb-12">
            Frequently asked questions
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 place-items-center">
            <div className="">
              <img
                src={AccordionImg}
                alt="accordion_img"
                className="w-4/5 rounded-lg mx-auto"
              />
            </div>
            <div>
              <Accordion />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
