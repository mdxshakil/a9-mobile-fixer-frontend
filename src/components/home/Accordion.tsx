import { IFaq } from "../../interface";
import { useGetAllFaqsQuery } from "../../redux/features/faq/faqApi";
import FaqAccordionSkeleton from "../Loader/FaqAccordionSkeleton";
import ErrorElement from "../shared/ErrorElement";
import NoContantFound from "../shared/NoContantFound";
import AccordionItem from "./AccordionItem";

const Accordion = () => {
  const { data: faqs, isLoading, isError } = useGetAllFaqsQuery(undefined);

  let content;
  if (isLoading) {
    content = <FaqAccordionSkeleton />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load faqs." />;
  } else if (!isLoading && !isError && faqs?.data?.length === 0) {
    content = <NoContantFound message="No service available" />;
  } else if (!isLoading && !isError && faqs?.data?.length > 0) {
    content = (
      <div className="join join-vertical w-full">
        {faqs?.data?.map((faq: IFaq) => (
          <AccordionItem key={faq.id} faq={faq} />
        ))}
      </div>
    );
  }

  return <div>{content}</div>;
};

export default Accordion;
