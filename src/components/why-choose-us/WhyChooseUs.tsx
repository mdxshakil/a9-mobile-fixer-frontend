import WhyChooseUsImg from "../../assets/why-choose-us.png";
import FeatureRight from "./FeatureRight";
import FeatureLeft from "./FeatureLeft";
import { Fade, Zoom } from "react-awesome-reveal";

const WhyChooseUs = () => {
  return (
    <div className="container py-12 mx-auto px-3 md:px-6">
      <section>
        <Fade>
          <h2 className="mb-12 text-3xl font-bold text-center">
            Why Choose Us
          </h2>
        </Fade>
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-12 md:gap-6">
            <Fade direction="left">
              <div className="flex flex-col gap-6 md:gap-12">
                <FeatureLeft
                  title="Low Cost"
                  description="There are many variations of passa Lorem Ipsum available but the majority have suffered"
                  iconAlignment="end"
                />
                <FeatureLeft
                  title="Super Fast "
                  description="There are many variations of passa Lorem Ipsum available but the majority have suffered"
                  iconAlignment="end"
                />
              </div>
            </Fade>
            <Zoom>
              <div>
                <img src={WhyChooseUsImg} alt="" className="w-56 md:w-72" />
              </div>
            </Zoom>
            <Fade direction="right">
              <div className="flex flex-col gap-6 md:gap-12">
                <FeatureRight
                  title="Best Technician"
                  description="There are many variations of passa Lorem Ipsum available but the majority have suffered"
                  iconAlignment="start"
                />
                <FeatureRight
                  title="Quality Parts"
                  description="There are many variations of passa Lorem Ipsum available but the majority have suffered"
                  iconAlignment="start"
                />
              </div>
            </Fade>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;
