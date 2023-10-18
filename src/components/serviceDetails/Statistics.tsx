import { useParams } from "react-router-dom";
import { useGetRatingOfServiceQuery } from "../../redux/features/rating/ratingApi";

type IProps = {
  cost: number;
  slotsPerDay: number;
  category: string;
};

const Statistics = ({ cost, slotsPerDay, category }: IProps) => {
  const { serviceId } = useParams();
  const { data: rating, isLoading } = useGetRatingOfServiceQuery(serviceId);

  return (
    <div>
      <div className="flex mb-4">
        <div className="mr-4">
          <span className="font-bold text-gray-700">Price: </span>
          <span className="text-gray-600 badge badge-info">{cost} bdt</span>
        </div>
        <div>
          <span className="font-bold text-gray-700">Slots per day: </span>
          <span className="text-gray-300 badge badge-primary px-4">
            {slotsPerDay}
          </span>
        </div>
      </div>
      <div className="flex mb-4">
        <div className="mr-4">
          <span className="font-bold text-gray-700">Rating: </span>
          <span
            className={`text-gray-600 badge badge-warning px-4 ${
              isLoading ? "loading-infinity" : ""
            }`}
          >
            {rating?.data}*
          </span>
        </div>
        <div className="mr-4">
          <span className="font-bold text-gray-700">Category: </span>
          <span className="text-gray-300 badge badge-neutral">{category}</span>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
