import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { useGetUpcomingEventsQuery } from "../redux/features/event/eventApi";
import LoadingSpinner from "./Loader/LoadingSpinner";
import ErrorElement from "./shared/ErrorElement";
import NoContantFound from "./shared/NoContantFound";
import { IEvent } from "../interface";
import EventCard from "./EventCard";
import SectionTitle from "./SectionTitle";

const UpcomingEventSection = () => {
  const {
    data: upcomingEvents,
    isLoading,
    isError,
  } = useGetUpcomingEventsQuery(undefined);

  let content;
  if (isLoading) {
    return <LoadingSpinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load data." />;
  } else if (!isLoading && !isError && upcomingEvents?.data?.length === 0) {
    content = <NoContantFound message="No data available" />;
  } else if (!isLoading && !isError && upcomingEvents?.data?.length > 0) {
    content = upcomingEvents?.data?.map((event: IEvent) => (
      <EventCard key={event.id} event={event} />
    ));
  }
  return (
    <Fade>
      <div className="text-center py-12 md:py-18">
        <SectionTitle
          title="Our Events"
          subTitle="Stay updated about our upcoming events"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center py-6 px-3 items-stretch">
          {content}
        </div>
        <Link to={"/all-events"}>
          <button className="btn btn-sm mt-3">Browse all events</button>
        </Link>
      </div>
    </Fade>
  );
};

export default UpcomingEventSection;
