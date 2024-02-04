/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IService } from "../../interface";
import { useGetUpcomingServiceQuery } from "../../redux/features/service/serviceApi";
import ServiceCard from "../ServiceCard";
import ErrorElement from "../shared/ErrorElement";
import NoContantFound from "../shared/NoContantFound";
import { Fade } from "react-awesome-reveal";
import SectionTitle from "../SectionTitle";
import BrowseAllBtn from "../buttons/BrowseAllBtn";
import ServiceCardLoader from "../Loader/ServiceCardSkeleton";
import ScrollTrigger from "react-scroll-trigger";
import { useState } from "react";

const UpcomingService = () => {
  const [willSkip, setWillSkip] = useState(true);
  const {
    data: upcomingServices,
    isLoading,
    isError,
  } = useGetUpcomingServiceQuery(undefined, { skip: willSkip });

  let content;
  if (isLoading) {
    content = <ServiceCardLoader length={4} />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load upcoming services." />;
  } else if (!isLoading && !isError && upcomingServices?.data?.length === 0) {
    content = <NoContantFound message="No upcoming service available" />;
  } else if (!isLoading && !isError && upcomingServices?.data?.length > 0) {
    content = (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center py-6 px-3">
        {upcomingServices?.data?.map((service: IService) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    );
  }

  return (
    // @ts-ignore
    <ScrollTrigger onEnter={() => setWillSkip(false)}>
      <Fade>
        <div className="py-12 md:py-18">
          <SectionTitle
            title="Upcoming services"
            subTitle="More services are on their way"
          />
          {content}
          <BrowseAllBtn to="/all-services" />
        </div>
      </Fade>
    </ScrollTrigger>
  );
};

export default UpcomingService;
