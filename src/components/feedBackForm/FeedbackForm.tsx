import { FormEvent, useEffect, useState } from "react";
import { useAddFeedbackMutation } from "../../redux/features/feedback/feedbackApi";
import toast from "react-hot-toast";

const FeedbackForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [addFeedback, { isLoading, isError, isSuccess }] =
    useAddFeedbackMutation();

  const handleFeedbackSubmit = (e: FormEvent) => {
    e.preventDefault();
    addFeedback({ email, message });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Feedback submitted");
      setEmail("");
      setMessage("");
    }
    if (isError) {
      toast.error("An error occured");
    }
  }, [isSuccess, isError]);

  return (
    <form id="feedbackForm" onSubmit={handleFeedbackSubmit}>
      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-gray-700 text-xs font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="border-0 px-3 py-3 rounded text-sm shadow w-full
bg-gray-300 placeholder-black text-gray-800 outline-none focus:bg-gray-400"
          placeholder=" "
          style={{ transition: "all 0.15s ease 0s" }}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-gray-700 text-xs font-bold mb-2"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          maxLength={300}
          name="feedback"
          id="feedback"
          rows={4}
          cols={80}
          className="border-0 px-3 py-3 bg-gray-300 placeholder-black text-gray-800 rounded text-sm shadow focus:outline-none w-full"
          placeholder="Your feedback....."
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <div className="text-center mt-6">
        <button
          id="feedbackBtn"
          className={`btn-primary text-black text-center mx-auto  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ${
            isLoading ? "loading-bars" : ""
          }`}
          type="submit"
          style={{ transition: "all 0.15s ease 0s" }}
          disabled={isLoading}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
