import LoadingSpinner from "../components/Loader/LoadingSpinner";
import ErrorElement from "../components/shared/ErrorElement";
import NoContantFound from "../components/shared/NoContantFound";
import useGetUserFromStore from "../hooks/useGetUser";
import { IBooking } from "../interface";
import { useGetMyBookingsQuery } from "../redux/features/booking/bookingApi";

const MyOrdersPage = () => {
  const { profileId } = useGetUserFromStore();
  const {
    data: myBookings,
    isLoading,
    isError,
  } = useGetMyBookingsQuery(profileId);

  let content;
  if (isLoading) {
    return <LoadingSpinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load bookings data." />;
  } else if (!isLoading && !isError && myBookings?.data?.length === 0) {
    content = <NoContantFound message="No orders available" />;
  } else if (!isLoading && !isError && myBookings?.data?.length > 0) {
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
            {myBookings?.data?.map((item: IBooking) => (
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
        <p className="text-center">Total orders: {myBookings?.data?.length}</p>
      </div>
      <div className="flex gap-2">
        <button className="btn btn-xs btn-warning">All</button>
        <button className="btn btn-xs btn-info">pending</button>
        <button className="btn btn-xs btn-success">Completed</button>
        <button className="btn btn-xs btn-error">Rejected</button>
      </div>
      <div className="px-2">{content}</div>
    </div>
  );
};

export default MyOrdersPage;
