import { IService } from "../../interface";
import { useGetHomePageServicesQuery } from "../../redux/features/service/serviceApi";
import ServiceCard from "../ServiceCard";
import ErrorElement from "../shared/ErrorElement";
import NoContantFound from "../shared/NoContantFound";
import { Fade } from "react-awesome-reveal";
import SectionTitle from "../SectionTitle";
import BrowseAllBtn from "../buttons/BrowseAllBtn";
import ServiceCardLoader from "../Loader/ServiceCardSkeleton";
import { useState } from "react";
import ScrollTrigger from "react-scroll-trigger";

const OurServices = () => {
  const [willSkip, setWillSkip] = useState(true);
  const {
    data: services,
    isLoading,
    isError,
  } = useGetHomePageServicesQuery(undefined, { skip: willSkip });

  let content;
  if (isLoading) {
    content = <ServiceCardLoader length={8} />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load services." />;
  } else if (!isLoading && !isError && services?.data?.length === 0) {
    content = <NoContantFound message="No service available" />;
  } else if (!isLoading && !isError && services?.data?.length > 0) {
    content = (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center py-6 px-3">
        {services?.data?.map((service: IService) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    );
  }

  return (
    // @ts-ignore
    <ScrollTrigger onEnter={() => setWillSkip(false)}>
      <Fade>
        <div className="pt-12 md:pt-20">
          <SectionTitle
            title="Our services"
            subTitle="Browse through our varieties of services"
          />
          {content}
          <BrowseAllBtn to="/all-services" />
        </div>
      </Fade>
    </ScrollTrigger>
  );
};

export default OurServices;
