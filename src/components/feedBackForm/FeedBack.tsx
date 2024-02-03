import { Fade } from "react-awesome-reveal";
import FeedbackForm from "./FeedbackForm";

const FeedBackSection = () => {
  return (
    <section>
      <div className="py-12 md:py-18">
        <Fade>
          <div className="mx-auto flex flex-col items-center md:flex-row my-6 md:my-18 gap-6 lg:gap-12">
            <div className="flex flex-col w-full lg:w-1/2 p-8">
              <div className="w-full h-4 rounded-md bg-primary"></div>
              <p className="text-3xl md:text-5xl my-4 leading-relaxed md:leading-snug text-accent font-bold">
                Any questions? Don't hesitate to contact us!
              </p>
              <p className="text-sm md:text-base leading-snug">
                Your feedback is important to us. Please provide your valuable
                feedback.
              </p>
            </div>

            <div className="flex flex-col w-full lg:w-1/2 justify-center ">
              <div className="container w-full px-4">
                <div className="flex flex-wrap justify-end">
                  <div className="w-full lg:w-full px-4 bg-base-200/50">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg">
                      <div className="flex-auto p-5 lg:p-10">
                        <FeedbackForm />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default FeedBackSection;
