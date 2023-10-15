import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { useGetSingleBookingQuery } from "../redux/features/booking/bookingApi";

type IProps = {
  serviceId: string;
  profileId: string;
};

const RatingStar = ({ profileId, serviceId }: IProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  //check if user has purchased this service or not
  const { data } = useGetSingleBookingQuery({ profileId, serviceId });

  return (
    <div>
      {data?.data ? (
        <div className="mb-4">
          <span className="font-bold text-gray-700">Submit rating</span>
          <div className="flex items-center mt-2">
            <div className="flex">
              {[...Array(5)].map((_, index) => {
                const currentRaing = index + 1;
                return (
                  <label>
                    <input
                      className="hidden"
                      type="radio"
                      name="rating"
                      value={currentRaing}
                      onClick={() => setRating(currentRaing)}
                    />
                    <FaStar
                      className="cursor-pointer"
                      size={25}
                      key={index}
                      color={
                        currentRaing <= (hover || rating)
                          ? "#ffc107"
                          : "#e4e5e9"
                      }
                      onMouseEnter={() => setHover(currentRaing)}
                      onMouseLeave={() => setHover(0)}
                    />
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RatingStar;
