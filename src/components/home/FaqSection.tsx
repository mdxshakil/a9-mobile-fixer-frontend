import Accordion from "./Accordion";
import AccordionImg from "../../assets/accordion-image.jpg";
import { Fade } from "react-awesome-reveal";

const FaqSection = () => {
  return (
    <div className="flex items-center justify-center py-12" id="faq-section">
      <div className="mt-12">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-12">
          Frequently asked questions
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 place-items-center">
          <Fade direction="left">
            <div className="">
              <img
                src={AccordionImg}
                alt="accordion_img"
                className="w-4/5 rounded-lg mx-auto"
              />
            </div>
          </Fade>
          <Fade direction="right">
            <div>
              <Accordion />
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
