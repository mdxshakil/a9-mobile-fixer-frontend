import { useState, FormEvent, useEffect } from "react";
import {
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation,
} from "../../../redux/features/booking/bookingApi";
import LoadingSpinner from "../../../components/Loader/LoadingSpinner";
import ErrorElement from "../../../components/shared/ErrorElement";
import NoContantFound from "../../../components/shared/NoContantFound";
import { IBooking } from "../../../interface";
import PaginationButton from "../../../components/pagination/PaginationButton";
import toast from "react-hot-toast";
import { BsCheckAll } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

const ManageBookingPage = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filter, setFilter] = useState("pending");

  const {
    data: bookings,
    isLoading,
    isError,
  } = useGetAllBookingsQuery({ page, sortBy, sortOrder, limit: 10, filter });
  const [updateBookingStatus, updateState] = useUpdateBookingStatusMutation();

  const isPreviousButtonDisabled = page === 1;
  const isNextButtonDisabled = page === bookings?.data?.meta?.pageCount;

  const handleSortByAndSortOrder = (e: FormEvent<HTMLSelectElement>) => {
    setSortBy("createdAt");
    setSortOrder(e.currentTarget.value);
  };

  const handleUpdateBookingStatus = (bookingId: string, action: string) => {
    updateBookingStatus({ bookingId, action });
  };

  useEffect(() => {
    if (updateState.isSuccess) {
      toast.success("Updated booking status!");
    }
    if (updateState.isError) {
      toast.error("Action failed.Try again");
    }
  }, [updateState]);

  if (updateState.isLoading) {
    return <LoadingSpinner />;
  }

  let content;
  if (isLoading) {
    return <LoadingSpinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load bookings." />;
  } else if (!isLoading && !isError && bookings?.data?.data?.length === 0) {
    content = <NoContantFound message="No bookings available" />;
  } else if (!isLoading && !isError && bookings?.data?.data?.length > 0) {
    content = (
      <table className="table">
        <thead>
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Date</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings?.data?.data?.map((booking: IBooking) => {
            return (
              <tr key={booking.id}>
                <td className="cursor-pointer hover:text-primary">
                  {booking.profile.firstName + " " + booking.profile.lastName}
                </td>
                <td>{booking.service.title}</td>
                <td>{booking.bookingTime}</td>
                <td>{booking.service.cost}</td>
                <td>{booking.status}</td>
                <td className="flex gap-2">
                  {booking.status === "pending" && (
                    <>
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() =>
                          handleUpdateBookingStatus(booking.id, "complete")
                        }
                      >
                        Complete
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() =>
                          handleUpdateBookingStatus(booking.id, "reject")
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {booking.status === "completed" && <BsCheckAll size={20} />}
                  {booking.status === "rejected" && <RxCross2 size={20} />}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <div>
        <div className="my-3 flex justify-center">
          {/* sort users - createdAt*/}
          <select
            className="select"
            onChange={(e) => handleSortByAndSortOrder(e)}
            value={sortOrder}
          >
            <option defaultValue={sortOrder} value={"asc"}>
              Ordered Last
            </option>
            <option value={"desc"}>Ordered First</option>
          </select>
          {/* filter */}
          <select
            className="select"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option defaultValue={filter} value={"pending"}>
              Pending
            </option>
            <option value={"rejected"}>Rejected</option>
            <option value={"completed"}>Completed</option>
            <option value={"all"}>All</option>
          </select>
        </div>
        <p>Total bookings: {bookings?.data?.meta?.total}</p>
        <div className="overflow-x-auto">{content}</div>
        <div>
          <PaginationButton
            setPage={setPage}
            isPreviousButtonDisabled={isPreviousButtonDisabled}
            isNextButtonDisabled={isNextButtonDisabled}
            currentPage={page}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageBookingPage;
