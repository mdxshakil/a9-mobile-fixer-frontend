import moment from "moment";
import { IReview } from "../../interface";
import { useGetAllReviewQuery } from "../../redux/features/review/reviewApi";
import LoadingSpinner from "../Loader/LoadingSpinner";
import ErrorElement from "../shared/ErrorElement";
import NoContantFound from "../shared/NoContantFound";

const Reviews = ({ serviceId }: { serviceId: string }) => {
  const { data: reviews, isLoading, isError } = useGetAllReviewQuery(serviceId);

  let content;
  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load reviews" />;
  } else if (!isLoading && !isError && reviews?.data?.length === 0) {
    content = <NoContantFound message="No reviews" />;
  } else if (!isLoading && !isError && reviews?.data?.length > 0) {
    content = reviews?.data?.map((review: IReview) => (
      <div key={review?.id} className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-8 rounded-full">
            <img src={review.profile.profilePicture} />
          </div>
        </div>
        <div className="chat-header text-xs">
          <span className="text-accent/50"> {review.profile.firstName}</span>
          <span className="ml-6 text-primary">
            {moment(review?.createdAt).startOf("second").fromNow()}
          </span>
        </div>
        <div className="chat-bubble bg-white border text-accent text-sm">
          {review.comment}
        </div>
      </div>
    ));
  }
  return <div className="mt-3">{content}</div>;
};

export default Reviews;
