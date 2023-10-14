import { useState, FormEvent, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/Loader/LoadingSpinner";
import { useAddNewFaqMutation } from "../../../redux/features/faq/faqApi";

const AddNewFaqPage = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [addNewFaq, { isSuccess, isError, isLoading, error }] =
    useAddNewFaqMutation();

  const handleAddNewFaq = (e: FormEvent) => {
    e.preventDefault();
    addNewFaq({ question, answer });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("New faq created successfully");
      navigate("/dashboard/manage-faqs");
    }
    if (isError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error as any)?.data?.message || "An error occured");
    }
  }, [isError, isSuccess, error, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-primary-100 rounded-lg p-8 shadow-lg w-full md:w-1/3 bg-base-300">
        <h1 className="text-3xl font-bold text-center text-primary-text mb-4">
          Add new FAQ
        </h1>
        <form onSubmit={handleAddNewFaq}>
          <div className="mb-4">
            <label htmlFor="title" className="text-primary-text">
              Question
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={question}
              className="w-full p-2 rounded-lg focus:outline-none input input-bordered input-primary"
              required
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="text-primary-text">
              Answer
            </label>
            <textarea
              id="description"
              name="description"
              value={answer}
              className="w-full p-2 rounded-lg textarea textarea-primary focus:outline-none"
              rows={4}
              required
              onChange={(e) => setAnswer(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className={`btn btn-primary px-4 py-2 rounded-lg hover:bg-primary-dark w-full`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewFaqPage;
