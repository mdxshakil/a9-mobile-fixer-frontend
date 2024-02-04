import toast from "react-hot-toast";
import { IEvent } from "../interface";
import { deleteConfirmationModal } from "../utils/deleteConfirmationModal";
import { formatDate } from "../utils/formatDate";
import { useEffect } from "react";
import {
  useChangeEventStatusMutation,
  useDeleteEventMutation,
} from "../redux/features/event/eventApi";
import useGetUserFromStore from "../hooks/useGetUser";

const EventCard = ({ event }: { event: IEvent }) => {
  const { id, title, venue, banner, eventDate, status } = event || {};
  const [deleteEvent, deleteEventState] = useDeleteEventMutation();
  const [changeEventStatus, changeState] = useChangeEventStatusMutation();
  const { role } = useGetUserFromStore();

  const handleEventDelete = async (eventId: string) => {
    deleteConfirmationModal(
      "Are you sure?",
      "You won't be able to revert this!",
      () => deleteEvent(eventId)
    );
  };

  const handleStatusChange = (eventId: string, action: string) => {
    changeEventStatus({ eventId, action });
  };

  useEffect(() => {
    if (deleteEventState.isSuccess || changeState.isSuccess) {
      toast.success("Action succes");
    }
    if (deleteEventState.isError || changeState.isError) {
      toast.error("Action failed.Try again");
    }
  }, [deleteEventState, changeState]);

  const isEnded = new Date().getTime() < new Date(eventDate).getTime();

  return (
    <div className="card image-full relative overflow-hidden">
      <figure>
        <img src={banner} alt="Event" />
      </figure>
      <div className="card-body">
        <span
          className={`absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 text-center text-sm font-bold ${
            isEnded ? "bg-primary text-accent" : "bg-accent text-primary"
          }`}
        >
          {isEnded ? status : "Ended"}
        </span>
        <div>
          <h2 className="card-title text-[14px] md:text-[20px]">
            <span>{title}</span>
          </h2>
        </div>
        <p className=" text-xs md:text-sm">
          Dont miss the opportunity. Participate in this event to gather
          valuable knowledge
        </p>
        <div className="card-actions justify-between">
          <div>
            <p className="text-sm">Venue: {venue}</p>
            <p className="text-sm">{formatDate(eventDate)}</p>
          </div>
          {role === "admin" && (
            <div className="flex gap-3">
              {status === "upcoming" ? (
                <button
                  className="btn btn-xs btn-warning"
                  onClick={() => handleStatusChange(id, "closed")}
                  disabled={changeState.isLoading}
                >
                  Close
                </button>
              ) : (
                <button
                  className="btn btn-xs"
                  onClick={() => handleStatusChange(id, "upcoming")}
                  disabled={changeState.isLoading}
                >
                  Upcoming
                </button>
              )}
              <button
                className="btn btn-xs btn-error"
                onClick={() => handleEventDelete(id)}
                disabled={deleteEventState.isLoading}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
