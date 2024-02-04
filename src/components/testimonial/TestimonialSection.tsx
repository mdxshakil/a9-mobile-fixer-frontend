import { Fade } from "react-awesome-reveal";
import { ITestimonial } from "../../interface";
import { useGetApprovedTestimonialsQuery } from "../../redux/features/testimonial/testimonialApi";
import LoadingSpinner from "../Loader/LoadingSpinner";
import ErrorElement from "../shared/ErrorElement";
import NoContantFound from "../shared/NoContantFound";
import TestimonialCard from "./TestimonialCard";
import SectionTitle from "../SectionTitle";
import { useState } from "react";
import ScrollTrigger from "react-scroll-trigger";
import Slider from "react-slick";
import { testimonialCarouselSettings } from "../../constants";

const TestimonialSection = () => {
  const [willSkip, setWillSkip] = useState(true);
  const {
    data: testimonials,
    isLoading,
    isError,
  } = useGetApprovedTestimonialsQuery(undefined, { skip: willSkip });

  let content;
  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load testimonials." />;
  } else if (!isLoading && !isError && testimonials?.data?.length === 0) {
    content = <NoContantFound message="No testimonial available" />;
  } else if (!isLoading && !isError && testimonials?.data?.length > 0) {
    content = (
      <div className="slider-container">
        <Slider {...testimonialCarouselSettings}>
          {testimonials?.data?.map((testimonial: ITestimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Slider>
      </div>
    );
  }

  return (
    // @ts-ignore
    <ScrollTrigger onEnter={() => setWillSkip(false)}>
      <Fade>
        <div className="container py-12 md:py-18 mx-auto">
          <section className="text-center">
            <SectionTitle
              title="Testimonials"
              subTitle="Some feedbacks of our beloved customers"
            />
            {content}
          </section>
        </div>
      </Fade>
    </ScrollTrigger>
  );
};

export default TestimonialSection;
