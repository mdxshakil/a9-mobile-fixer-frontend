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
        <div className="mb-4">
          <span className="font-bold text-gray-700">Submit rating</span>
          <div className="flex items-center mt-2">
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
                      className="cursor-pointer"
                      size={25}
                      color={
                        currentRating <= (hover || rating)
                          ? "#ffc107"
                          : "#9CA3AF"
                      }
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
            className={`btn btn-xs btn-warning my-2 ${
              isLoading ? "loading-ball" : ""
            }`}
            disabled={rating === 0}
          >
            Submit Rating
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default RatingStar;
