/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FormEvent, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/Loader/LoadingSpinner";
import {
  useEditFaqMutation,
  useGetFaqByIdQuery,
} from "../../../redux/features/faq/faqApi";

const EditFaqPage = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const { faqId } = useParams();

  const { data: faq, isLoading } = useGetFaqByIdQuery(faqId);
  const [editFaq, editState] = useEditFaqMutation();

  useEffect(() => {
    setQuestion(faq?.data?.question);
    setAnswer(faq?.data?.answer);
  }, [faq?.data?.answer, faq?.data?.question]);

  const handleEditFaq = (e: FormEvent) => {
    e.preventDefault();
    const updatedData = {
      question,
      answer,
    };
    editFaq({ faqId, updatedData });
  };

  useEffect(() => {
    if (editState.isSuccess) {
      toast.success("Faq updated successfully");
      navigate("/dashboard/manage-faqs");
    }
    if (editState.isError) {
      toast.error(
        (editState.error as any)?.data?.message || "An error occured"
      );
    }
  }, [editState, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="rounded-lg p-8 w-full md:w-1/3">
        <h1 className="text-3xl font-bold text-center text-accent mb-4">
          Edit Faq
        </h1>
        <form onSubmit={handleEditFaq}>
          <div className="mb-4">
            <label htmlFor="title" className="text-primary-text">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={question}
              className="w-full p-2 rounded-lg focus:outline-none input input-bordered"
              required
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="text-primary-text">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full p-2 rounded-lg textarea textarea-bordered focus:outline-none"
              rows={4}
              required
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-primary px-4 py-2 rounded-lg hover:bg-primary-dark w-full"
              disabled={editState.isLoading}
            >
              {editState.isLoading ? "Please wait..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFaqPage;
