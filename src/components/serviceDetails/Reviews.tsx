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
          <div className="w-10 rounded-full">
            <img src={review.profile.profilePicture} />
          </div>
        </div>
        <div className="chat-header">{review.profile.firstName}</div>
        <div className="chat-bubble bg-gray-300 text-gray-600">
          {review.comment}
        </div>
        <div className="chat-footer opacity-50 text-xs">
          {review.createdAt.toLocaleString()}
        </div>
      </div>
    ));
  }
  return (
    <>
      <p className="text-xl font-bold">Reviews</p>
      {content}
    </>
  );
};

export default Reviews;
