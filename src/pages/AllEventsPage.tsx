import ErrorElement from "../components/shared/ErrorElement";
import NoContantFound from "../components/shared/NoContantFound";
import { IEvent } from "../interface";
import EventCard from "../components/EventCard";
import { useGetAllEventsQuery } from "../redux/features/event/eventApi";
import { Fade } from "react-awesome-reveal";
import EventCardLoader from "../components/Loader/EventCardLoader";
import SectionTitle from "../components/SectionTitle";

const AllEventsPage = () => {
  const { data: events, isLoading, isError } = useGetAllEventsQuery(undefined);

  let content;
  if (isLoading) {
    content = <EventCardLoader />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load events." />;
  } else if (!isLoading && !isError && events?.data?.length === 0) {
    content = <NoContantFound message="No events available" />;
  } else if (!isLoading && !isError && events?.data?.length > 0) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {events?.data?.map((event: IEvent) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    );
  }

  return (
    <Fade>
      <div className="p-3">
        <SectionTitle
          title="Our Events"
          subTitle={`Total events: ${events?.data?.length}`}
        />
        <div className="mt-6">{content}</div>
      </div>
    </Fade>
  );
};

export default AllEventsPage;
