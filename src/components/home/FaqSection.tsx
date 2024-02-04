import Accordion from "./Accordion";
import AccordionImg from "../../assets/accordion-image.jpg";
import { Fade } from "react-awesome-reveal";
import SectionTitle from "../SectionTitle";

const FaqSection = () => {
  return (
    <Fade>
      <div
        className="flex items-center justify-center pt-12 md:pt-20"
        id="faq-section"
      >
        <div>
          <SectionTitle
            title="Frequently asked questions"
            subTitle="Still have question? You can contact us anytime"
          />
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
    </Fade>
  );
};

export default FaqSection;
