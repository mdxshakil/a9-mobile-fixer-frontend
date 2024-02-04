import { Fade } from "react-awesome-reveal";
import { useGetUpcomingEventsQuery } from "../redux/features/event/eventApi";
import ErrorElement from "./shared/ErrorElement";
import NoContantFound from "./shared/NoContantFound";
import { IEvent } from "../interface";
import EventCard from "./EventCard";
import SectionTitle from "./SectionTitle";
import BrowseAllBtn from "./buttons/BrowseAllBtn";
import { useState } from "react";
import ScrollTrigger from "react-scroll-trigger";
import EventCardLoader from "./Loader/EventCardLoader";

const UpcomingEventSection = () => {
  const [willSkip, setWillSkip] = useState(true);
  const {
    data: upcomingEvents,
    isLoading,
    isError,
  } = useGetUpcomingEventsQuery(undefined, { skip: willSkip });

  let content;
  if (isLoading) {
    content = <EventCardLoader />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load events." />;
  } else if (!isLoading && !isError && upcomingEvents?.data?.length === 0) {
    content = <NoContantFound message="No events available." />;
  } else if (!isLoading && !isError && upcomingEvents?.data?.length > 0) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center py-6 px-3 items-stretch">
        {upcomingEvents?.data?.map((event: IEvent) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    );
  }
  return (
    // @ts-ignore
    <ScrollTrigger onEnter={() => setWillSkip(false)}>
      <Fade>
        <div className="text-center pt-12 md:pt-20">
          <SectionTitle
            title="Our Events"
            subTitle="Stay updated about our upcoming events"
          />
          {content}
          <BrowseAllBtn to="/all-events" />
        </div>
      </Fade>
    </ScrollTrigger>
  );
};

export default UpcomingEventSection;
