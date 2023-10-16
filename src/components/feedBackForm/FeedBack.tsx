import FeedbackForm from "./FeedbackForm";

const FeedBackSection = () => {
  return (
    <section>
      <div className="py-12">
        <div className="container mx-auto flex flex-col items-center md:flex-row my-6 md:my-24">
          <div className="flex flex-col w-full lg:w-1/2 p-8">
            <div className="w-full h-4 bg-red-500"></div>
            <p className="text-3xl md:text-5xl my-4 leading-relaxed md:leading-snug">
              Any questions? Don't hesitate to contact us!
            </p>
            <p className="text-sm md:text-base leading-snug ">
              Your feedback is important to us. Please provide your valuable
              feedback.
            </p>
          </div>
          <div className="flex flex-col w-full lg:w-2/3 justify-center">
            <div className="container w-full px-4">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-2/3 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-base-200">
                    <div className="flex-auto p-5 lg:p-10">
                      <h4 className="text-2xl mb-4 text-black font-semibold">
                        Have a Question or suggestion?
                      </h4>
                      <FeedbackForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedBackSection;
