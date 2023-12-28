import Accordion from "./Accordion";
import AccordionImg from "../../assets/accordion-image.jpg";
import { Fade } from "react-awesome-reveal";

const FaqSection = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      id="faq-section"
    >
      <div className="mt-12">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Frequently asked questions
          </h1>
          <p className="text-center mt-2">
            Still have question? You can contact us anytime
          </p>
        </div>
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
