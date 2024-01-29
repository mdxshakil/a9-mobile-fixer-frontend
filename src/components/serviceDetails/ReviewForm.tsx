import { AiOutlineSend } from "react-icons/ai";
import { useGetSingleBookingQuery } from "../../redux/features/booking/bookingApi";
import { FormEvent, useEffect, useState } from "react";
import { useAddReviewMutation } from "../../redux/features/review/reviewApi";
import toast from "react-hot-toast";

type IProps = {
  serviceId: string;
  profileId: string;
};

const ReviewForm = ({ profileId, serviceId }: IProps) => {
  //check if user has purchased this service or not
  //if purchased,then he can submit rating
  const { data } = useGetSingleBookingQuery({ profileId, serviceId });
  const [comment, setComment] = useState("");
  const [addReview, { isLoading, isError, isSuccess }] = useAddReviewMutation();

  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    addReview({ profileId, serviceId, comment });
  };

  useEffect(() => {
    if (isError) {
      toast.error("Failed to add review");
    }
    if (isSuccess) {
      toast.success("Review addded");
      setComment("");
    }
  }, [isError, isSuccess]);

  return (
    <div>
      {data?.data ? (
        <div>
          <p className="text-xl font-bold text-accent mb-3">
            Leave your review here
          </p>
          <form className="flex items-center gap-3" onSubmit={handleAddReview}>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered outline-none focus:outline-none focus:border-primary w-full max-w-xs rounded-full"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <button
              type="submit"
              className={`${isLoading ? "loading" : ""} hover:text-primary`}
              disabled={isLoading}
            >
              <AiOutlineSend size={25} />
            </button>
          </form>
        </div>
      ) : (
        <p className="text-xl font-bold text-accent mb-3">
          Purchase this service to add a review
        </p>
      )}
    </div>
  );
};

export default ReviewForm;
