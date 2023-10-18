import { IFaq } from "../../interface";
import { useGetAllFaqsQuery } from "../../redux/features/faq/faqApi";
import LoadingSpinner from "../Loader/LoadingSpinner";
import ErrorElement from "../shared/ErrorElement";
import AccordionItem from "./AccordionItem";

const Accordion = () => {
  const { data: faqs, isLoading, isError } = useGetAllFaqsQuery(undefined);

  return (
    <div className="join join-vertical w-full">
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <ErrorElement message={"Failed to load faqs"}/>
      ) : (
        faqs?.data.map((faq: IFaq) => <AccordionItem key={faq.id} faq={faq} />)
      )}
    </div>
  );
};

export default Accordion;
