import toast from "react-hot-toast";
import LoadingSpinner from "../components/Loader/LoadingSpinner";
import PaginationButton from "../components/pagination/PaginationButton";
import ErrorElement from "../components/shared/ErrorElement";
import NoContantFound from "../components/shared/NoContantFound";
import useGetUserFromStore from "../hooks/useGetUser";
import { IBooking } from "../interface";
import {
  useCancelBookingMutation,
  useGetMyBookingsQuery,
} from "../redux/features/booking/bookingApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyOrdersPage = () => {
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const [filter, setFilter] = useState("");
  const { profileId, role } = useGetUserFromStore();
  const [cancelBooking, cancelState] = useCancelBookingMutation();
  const navigate = useNavigate();

  const {
    data: myBookings,
    isLoading,
    isError,
  } = useGetMyBookingsQuery({
    profileId,
    page,
    limit: 10,
    sortBy: "createdAt",
    sortOrder,
    filter,
  });

  const isPreviousButtonDisabled = page === 1;
  const isNextButtonDisabled = page === myBookings?.data?.meta?.pageCount;

  useEffect(() => {
    if (cancelState.isError) {
      toast.error(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (cancelState.error as any)?.data?.message || "Failed to cancel booking"
      );
    }
    if (cancelState.isSuccess) {
      toast.success("Booking Cancelled");
    }
  }, [cancelState, navigate, role]);

  let content;
  if (isLoading) {
    return <LoadingSpinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load bookings data." />;
  } else if (!isLoading && !isError && myBookings?.data?.data?.length === 0) {
    content = <NoContantFound message="No orders available" />;
  } else if (!isLoading && !isError && myBookings?.data?.data?.length > 0) {
    content = (
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Cost</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {myBookings?.data?.data?.map((item: IBooking) => (
              <tr key={item.id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.service.image}
                          alt={item.service.category}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.service.title}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="badge badge-secondary">
                    {item.service.cost}
                  </div>
                </td>
                <td>
                  <div className="badge  badge-warning">{item.bookingTime}</div>
                </td>
                <td className="flex gap-2 items-center">
                  <div
                    className={`badge badge-outline ${
                      item.status === "pending"
                        ? "badge-info"
                        : item.status === "completed"
                        ? "badge-success"
                        : item.status === "rejected"
                        ? "badge-error"
                        : "badge-primary"
                    }`}
                  >
                    {item.status}
                  </div>
                  {item.status === "pending" && (
                    <button
                      className={`btn btn-xs btn-error ${
                        cancelState.isLoading ? "loading-bars" : ""
                      }`}
                      disabled={cancelState.isLoading}
                      onClick={() => cancelBooking(item.id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div>
      <div className="py-3 px-2">
        <h1 className="text-center text-4xl my-3">My Bookings</h1>
        <p className="text-center">
          Total orders: {myBookings?.data?.meta?.total}
        </p>
      </div>
      <div className="flex">
        <div>
          {/* filter by booking status*/}
          <select
            className="select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option defaultValue={filter} value={"all"}>
              All
            </option>
            <option value={"pending"}>Pending</option>
            <option value={"rejected"}>Rejected</option>
            <option value={"completed"}>Completed</option>
          </select>
        </div>
        <div>
          {/* sort bookings - createdAt*/}
          <select
            className="select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option defaultValue={sortOrder} value={"asc"}>
              Ordered First
            </option>
            <option value={"desc"}>Ordered Last</option>
          </select>
        </div>
      </div>
      <div className="px-2">{content}</div>
      <div>
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

export default MyOrdersPage;
