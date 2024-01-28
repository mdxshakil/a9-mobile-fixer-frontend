import { Fade } from "react-awesome-reveal";
import { ITestimonial } from "../../interface";
import { useGetApprovedTestimonialsQuery } from "../../redux/features/testimonial/testimonialApi";
import LoadingSpinner from "../Loader/LoadingSpinner";
import ErrorElement from "../shared/ErrorElement";
import NoContantFound from "../shared/NoContantFound";
import TestimonialCard from "./TestimonialCard";
import SectionTitle from "../SectionTitle";

const TestimonialSection = () => {
  const {
    data: testimonials,
    isLoading,
    isError,
  } = useGetApprovedTestimonialsQuery(undefined);

  let content;
  if (isLoading) {
    return <LoadingSpinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load testimonials." />;
  } else if (!isLoading && !isError && testimonials?.data?.length === 0) {
    content = <NoContantFound message="No testimonial available" />;
  } else if (!isLoading && !isError && testimonials?.data?.length > 0) {
    content = testimonials?.data?.map((testimonial: ITestimonial) => (
      <TestimonialCard key={testimonial.id} testimonial={testimonial} />
    ));
  }

  return (
    <Fade>
      <div className="container py-12 md:py-18 mx-auto">
        <section className="text-center">
          <SectionTitle
            title="Testimonials"
            subTitle="Some feedbacks of our beloved customers"
          />
          <div className="grid gap-x-6 md:grid-cols-3 lg:gap-x-12">
            {content}
          </div>
        </section>
      </div>
    </Fade>
  );
};

export default TestimonialSection;
