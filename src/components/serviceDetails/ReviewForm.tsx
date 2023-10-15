import { AiOutlineSend } from "react-icons/ai";
import { useGetSingleBookingQuery } from "../../redux/features/booking/bookingApi";

type IProps = {
  serviceId: string;
  profileId: string;
};

const ReviewForm = ({ profileId, serviceId }: IProps) => {
  //check if user has purchased this service or not
  const { data } = useGetSingleBookingQuery({ profileId, serviceId });

  return (
    <div>
      {data?.data ? (
        <div>
          <p className="text-xl font-bold">Leave your review here</p>
          <form className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
            <button type="submit" className="">
              <AiOutlineSend size={25} />
            </button>
          </form>
        </div>
      ) : (
        <p>Purchase this service to add a review</p>
      )}
    </div>
  );
};

export default ReviewForm;
