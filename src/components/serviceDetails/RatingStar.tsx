import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useGetSingleBookingQuery } from "../../redux/features/booking/bookingApi";
import { useAddRatingMutation } from "../../redux/features/rating/ratingApi";
import toast from "react-hot-toast";

type IProps = {
  serviceId: string;
  profileId: string;
};

const RatingStar = ({ profileId, serviceId }: IProps) => {
  // Check if the user has purchased this service or not
  // If purchased, then they can submit a rating
  const { data } = useGetSingleBookingQuery({ profileId, serviceId });
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [addrating, { isSuccess, isError, isLoading }] = useAddRatingMutation();

  
  const handleRatingSubmit = () => {
    addrating({ serviceId, profileId, ratingValue: rating });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Rating submitted");
    }
    if (isError) {
      toast.error("Failed to submit rating");
    }
  }, [isError, isSuccess]);

  return (
    <div>
      {data?.data ? (
        <div className="flex items-center gap-x-2">
          <span className="font-semibold text-accent">Submit rating:</span>
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, index) => {
                const currentRating = index + 1;
                return (
                  <label key={index}>
                    <input
                      className="hidden"
                      type="radio"
                      name="rating"
                      value={currentRating}
                      onClick={() => setRating(currentRating)}
                    />
                    <FaStar
                      className={`cursor-pointer ${
                        currentRating <= (hover || rating)
                          ? "text-yellow-300"
                          : "text-gray-300"
                      }`}
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(0)}
                    />
                  </label>
                );
              })}
            </div>
          </div>
          <button
            onClick={handleRatingSubmit}
            className="btn btn-xs btn-outline btn-primary my-2 rounded-full"
            disabled={rating === 0 || isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default RatingStar;
