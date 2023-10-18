import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import AccordionItem from "../../../components/home/AccordionItem";
import {
  useDeleteFaqByIdMutation,
  useGetAllFaqsQuery,
} from "../../../redux/features/faq/faqApi";
import LoadingSpinner from "../../../components/Loader/LoadingSpinner";
import ErrorElement from "../../../components/shared/ErrorElement";
import NoContantFound from "../../../components/shared/NoContantFound";
import { IFaq } from "../../../interface";
import { deleteConfirmationModal } from "../../../utils/deleteConfirmationModal";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ManageFaqsPage = () => {
  const { data: faqs, isLoading, isError } = useGetAllFaqsQuery(undefined);
  const [deleteFaq, deleteFaqState] = useDeleteFaqByIdMutation();

  const handleFaqDelete = async (faqId: string) => {
    deleteConfirmationModal(
      "Are you sure?",
      "You won't be able to revert this!",
      () => deleteFaq(faqId)
    );
  };

  useEffect(() => {
    if (deleteFaqState.isSuccess) {
      toast.success("Action succed!");
    }
    if (deleteFaqState.isError) {
      toast.error("Action failed.Try again");
    }
  }, [deleteFaqState]);

  if (deleteFaqState.isLoading) {
    return <LoadingSpinner />;
  }

  let content;
  if (isLoading) {
    return <LoadingSpinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load faqs." />;
  } else if (!isLoading && !isError && faqs?.data?.length === 0) {
    content = <NoContantFound message="No faqs available" />;
  } else if (!isLoading && !isError && faqs?.data?.length > 0) {
    content = (
      <div className="my-3 mx-auto w-full md:w-3/5">
        {faqs?.data?.map((faq: IFaq) => (
          <div className="flex items-center gap-2">
            <AccordionItem key={faq.id} faq={faq} />
            <div className="flex gap-2 items-center">
              <p>
                <Link to={`/dashboard/edit-faq/${faq.id}`}>
                  <FaEdit size={20} className="cursor-pointer" />
                </Link>
              </p>
              <FaTrash
                size={20}
                className="cursor-pointer"
                onClick={() => handleFaqDelete(faq.id)}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="py-3 px-3">
        <Link to="/dashboard/add-new-faq">
          <button className="btn btn-sm btn-primary ">
            Add New FAQ <FaPlus />
          </button>
        </Link>
      </div>
      <p className="text-center text-primary">Total faqs: {faqs?.data?.length}</p>
      <div className="px-2">{content}</div>
    </div>
  );
};

export default ManageFaqsPage;
