import { useParams } from "react-router-dom";
import { useGetServiceByIdQuery } from "../redux/features/service/serviceApi";
import RatingStar from "../components/serviceDetails/RatingStar";
import LoadingSpinner from "../components/Loader/LoadingSpinner";
import ErrorElement from "../components/shared/ErrorElement";
import useGetUserFromStore from "../hooks/useGetUser";
import ReviewForm from "../components/serviceDetails/ReviewForm";
import Reviews from "../components/serviceDetails/Reviews";
import ActionButtons from "../components/serviceDetails/ActionButtons";
import Statistics from "../components/serviceDetails/Statistics";
import ServiceImage from "../components/serviceDetails/ServiceImage";
import Header from "../components/serviceDetails/Header";
import { useCheckRatingGivenOrNotQuery } from "../redux/features/rating/ratingApi";

const ServiceDetailsPage = () => {
  const { serviceId } = useParams();
  const { profileId, role } = useGetUserFromStore();

  const {
    data: service,
    isLoading,
    isError,
  } = useGetServiceByIdQuery(serviceId);
  const { image, title, cost, description, slotsPerDay, category } =
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

  return (
    <div>
      <div className="bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4 items-center">
            <div className="md:flex-1 px-4">
              <ServiceImage image={image} />
              {role === "user" && (
                <ActionButtons
                  profileId={profileId}
                  serviceId={serviceId as string}
                />
              )}
            </div>
            <div className="md:flex-1 px-4">
              <Header title={title} description={description} />
              <Statistics
                cost={cost}
                slotsPerDay={slotsPerDay}
                category={category}
              />
              {!checkRating?.data?.ratingValue ? (
                <RatingStar
                  profileId={profileId}
                  serviceId={serviceId as string}
                />
              ) : (
                <p className="font-bold">
                  Your rating: {checkRating?.data?.ratingValue}
                </p>
              )}
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
