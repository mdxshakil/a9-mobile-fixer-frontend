import { IService } from "../../interface";
import { useGetUpcomingServiceQuery } from "../../redux/features/service/serviceApi";
import LoadingSpinner from "../Loader/LoadingSpinner";
import ServiceCard from "../ServiceCard";
import ErrorElement from "../shared/ErrorElement";
import NoContantFound from "../shared/NoContantFound";
import { Fade } from "react-awesome-reveal";
import SectionTitle from "../SectionTitle";
import BrowseAllBtn from "../buttons/BrowseAllBtn";

const UpcomingService = () => {
  const {
    data: upcomingServices,
    isLoading,
    isError,
  } = useGetUpcomingServiceQuery(undefined);

  let content;
  if (isLoading) {
    return <LoadingSpinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load data." />;
  } else if (!isLoading && !isError && upcomingServices?.data?.length === 0) {
    content = <NoContantFound message="No data available" />;
  } else if (!isLoading && !isError && upcomingServices?.data?.length > 0) {
    content = upcomingServices?.data?.map((service: IService) => (
      <ServiceCard key={service.id} service={service} />
    ));
  }

  return (
    <Fade>
      <div className="py-12 md:py-18">
        <SectionTitle
          title="Upcoming services"
          subTitle="More services are on their way"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center py-6 px-3 items-stretch">
          {content}
        </div>
        <BrowseAllBtn to="/all-services" text="Browse available services" />
      </div>
    </Fade>
  );
};

export default UpcomingService;
