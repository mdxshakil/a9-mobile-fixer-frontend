import { IFaq } from "../../interface";

const AccordionItem = ({ faq }: { faq: IFaq }) => {
  return (
    <div className="collapse collapse-arrow join-item border border-base-300">
      <input type="radio" name="my-accordion-4" />
      <div className="collapse-title text-base md:text-xl font-medium">
        {faq.question}
      </div>
      <div className="collapse-content">
        <p className="text-primary">{faq.answer}</p>
      </div>
    </div>
  );
};

export default AccordionItem;
