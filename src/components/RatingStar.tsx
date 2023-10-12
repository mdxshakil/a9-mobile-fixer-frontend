import { FaStar } from "react-icons/fa";
import { useState } from "react";

const RatingStar = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
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
              color={currentRaing <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(currentRaing)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default RatingStar;
