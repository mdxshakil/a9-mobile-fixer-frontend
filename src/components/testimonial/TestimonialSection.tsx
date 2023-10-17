import { ITestimonial } from "../../interface";
import { useGetApprovedTestimonialsQuery } from "../../redux/features/testimonial/testimonialApi";
import LoadingSpinner from "../Loader/LoadingSpinner";
import ErrorElement from "../shared/ErrorElement";
import NoContantFound from "../shared/NoContantFound";
import TestimonialCard from "./TestimonialCard";

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
    <div className="container my-12 mx-auto px-3 md:px-6">
      <section className="mb-32 text-center">
        <h2 className="mb-12 text-3xl font-bold">Testimonials</h2>
        <div className="grid gap-x-6 md:grid-cols-3 lg:gap-x-12">{content}</div>
      </section>
    </div>
  );
};

export default TestimonialSection;
