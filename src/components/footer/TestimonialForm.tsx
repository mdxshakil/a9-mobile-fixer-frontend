import { AiOutlineSend } from "react-icons/ai";
import useGetUserFromStore from "../../hooks/useGetUser";
import { useCheckServicePurchasedOrNotQuery } from "../../redux/features/booking/bookingApi";
import { FormEvent, useEffect, useState } from "react";
import { useAddTestimonialMutation } from "../../redux/features/testimonial/testimonialApi";
import toast from "react-hot-toast";

const TestimonialForm = () => {
  const { role, profileId } = useGetUserFromStore();
  const [experience, setExperience] = useState("");
  const [message, setMessage] = useState("");
  //check if the user atleast purchased one service or not
  const { data: checkPurchase } = useCheckServicePurchasedOrNotQuery(
    profileId,
    { skip: !profileId || role !== "user" }
  );
  //add testimonial
  const [addTestimonial, { isLoading, isError, isSuccess }] =
    useAddTestimonialMutation();

  const isPurchased = !!checkPurchase?.data;

  const handleTestimonialSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTestimonial({ experience, message, profileId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Testimonial submitted");
      setMessage("");
      setExperience("");
    }
    if (isError) {
      toast.error("An error occured");
    }
  }, [isSuccess, isError]);

  return (
    <div className="mt-8 space-y-4 lg:mt-0">
      <span className=" h-1 w-full rounded bg-primary block"></span>
      <div>
        <h2 className="text-2xl font-medium text-accent">
          Tell something about our service
        </h2>

        <p className="mt-4 max-w-lg text-gray-500">
          Tell use your experience about the service that you have taken from
          us. Share your experience with every one. This helps use to improve
          our service.
        </p>
        {(role !== "user" || !isPurchased) && (
          <small className="text-xs italic text-error">
            *You must purchase a service to leave us a review
          </small>
        )}
      </div>
      {/* if user is not logged in or didnt purchased a service they cant provide testimonial */}
      <form
        className="mt-6 w-full flex items-center gap-3"
        onSubmit={handleTestimonialSubmit}
      >
        <div>
          <select
            className="select"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            disabled={role !== "user" || !isPurchased}
            required
          >
            <option value="" disabled defaultValue={""}>
              Experience
            </option>
            <option value={"very_good"}>Very Good</option>
            <option value={"good"}>Good</option>
            <option value={"average"}>Average</option>
          </select>
        </div>
        <textarea
          className="textarea w-full sm:w-2/3 textarea-error"
          placeholder="Say something about our service"
          disabled={role !== "user" || !isPurchased}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`btn btn-ghost p-0 ${
            role !== "user" || !isPurchased ? "cursor-not-allowed" : ""
          } ${isLoading ? "loading-bars" : ""}`}
          disabled={isLoading}
        >
          <AiOutlineSend size={35} className="text-primary" />
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm;
