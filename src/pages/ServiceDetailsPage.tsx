import { useParams } from "react-router-dom";
import { useGetServiceByIdQuery } from "../redux/features/service/serviceApi";
import RatingStar from "../components/serviceDetails/RatingStar";
import LoadingSpinner from "../components/Loader/LoadingSpinner";
import ErrorElement from "../components/shared/ErrorElement";
import useGetUserFromStore from "../hooks/useGetUser";
import ReviewForm from "../components/serviceDetails/ReviewForm";
import Reviews from "../components/serviceDetails/Reviews";
import ServiceImage from "../components/serviceDetails/ServiceImage";
import Header from "../components/serviceDetails/Header";
import { useCheckRatingGivenOrNotQuery } from "../redux/features/rating/ratingApi";
import { calculateAvgRating } from "../utils/calculateAvgRating";
import { IRating } from "../interface";
import { FaStar } from "react-icons/fa";
import ActionButtons from "../components/serviceDetails/ActionButtons";

const ServiceDetailsPage = () => {
  const { serviceId } = useParams();
  const { profileId, role } = useGetUserFromStore();

  const {
    data: service,
    isLoading,
    isError,
  } = useGetServiceByIdQuery(serviceId);
  const { image, title, cost, description, slotsPerDay, category, ratings } =
    service?.data || {};

  //check if user already submitted a rating or not for the service
  //if submitted ,then can not submit again
  const { data: checkRating } = useCheckRatingGivenOrNotQuery({
    serviceId,
    profileId,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <ErrorElement message="Failed to retrive service info" />;
  }

  const rating = calculateAvgRating(ratings as [IRating]);

  return (
    <div>
      <div className="bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4 items-center">
            <div className="md:flex-1 px-4">
              <ServiceImage image={image} />
            </div>
            <div className="md:flex-1 px-4">
              <div className="flex justify-between flex-col gap-3">
                <span className="badge badge-outline badge-primary badge-lg">
                  {category}
                </span>
                <Header title={title} description={description} />
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    {Array.from({ length: rating }).map((_rating, i) => (
                      <FaStar key={i} className="text-yellow-300" />
                    ))}
                    {rating === 0 &&
                      Array.from({ length: 5 }).map((_rating, i) => (
                        <FaStar key={i} className="text-gray-300" />
                      ))}
                  </div>
                  <p>
                    <span className="text-primary">{rating}</span>
                    {"  "}
                    <span className="text-sm">
                      ({ratings?.length}{" "}
                      {ratings?.length > 1 ? "reviews" : "review"})
                    </span>
                  </p>
                </div>
                {!checkRating?.data?.ratingValue ? (
                  <RatingStar
                    profileId={profileId}
                    serviceId={serviceId as string}
                  />
                ) : (
                  <p className="font-bold text-accent flex items-center">
                    My rating: {checkRating?.data?.ratingValue}
                    <FaStar className="text-yellow-300" />
                  </p>
                )}
                {/* footer */}
                <div className="flex items-center justify-between mt-6">
                  <p className="text-primary font-bold text-lg md:text-3xl">
                    Slots: {slotsPerDay}
                  </p>
                  <p className="text-primary font-bold text-lg md:text-3xl">
                    &#2547;{cost}
                  </p>
                  {role === "user" && (
                    <ActionButtons
                      profileId={profileId}
                      serviceId={serviceId as string}
                    />
                  )}
                </div>
                {/* footer end */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* reviews */}
      <div className="mt-6 px-6">
        {role === "user" && (
          <ReviewForm profileId={profileId} serviceId={serviceId as string} />
        )}
        <Reviews serviceId={serviceId as string} />
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
