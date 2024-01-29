import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import EventCard from "../../../components/EventCard";
import { useGetAllEventsQuery } from "../../../redux/features/event/eventApi";
import LoadingSpinner from "../../../components/Loader/LoadingSpinner";
import ErrorElement from "../../../components/shared/ErrorElement";
import NoContantFound from "../../../components/shared/NoContantFound";
import { IEvent } from "../../../interface";

const ManageEventsPage = () => {
  const { data: events, isLoading, isError } = useGetAllEventsQuery(undefined);

  let content;
  if (isLoading) {
    return <LoadingSpinner />;
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
    <div>
      <div className="py-3 px-3">
        <Link to="/dashboard/add-new-event">
          <button className="btn btn-sm btn-primary text-accent">
            Add New Event <FaPlus />
          </button>
        </Link>
      </div>
      <p className="text-center text-primary">
        Total events: {events?.data?.length}
      </p>
      <div className="p-2">{content}</div>
    </div>
  );
};

export default ManageEventsPage;
