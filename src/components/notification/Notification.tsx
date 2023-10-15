import useGetUserFromStore from "../../hooks/useGetUser";
import { useGetMyNotificationsQuery } from "../../redux/features/notification/notificationApi";
import LoadingSpinner from "../Loader/LoadingSpinner";
import ErrorElement from "../shared/ErrorElement";
import NoContantFound from "../shared/NoContantFound";
import { INotification } from "../../interface";

const Notification = () => {
  const { profileId, role } = useGetUserFromStore();
  const {
    data: notifications,
    isLoading,
    isError,
  } = useGetMyNotificationsQuery(profileId, {
    skip: !profileId || role !== "user",
  });

  let content;
  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load notifications." />;
  } else if (!isLoading && !isError && notifications?.data?.length === 0) {
    content = <NoContantFound message="No notifiction available" />;
  } else if (!isLoading && !isError && notifications?.data?.length > 0) {
    content = notifications?.data?.map((notification: INotification) => (
      <p className="p-2 font-bold text-sm border">{notification.content}</p>
    ));
  }

  return (
    <div className="dropdown-content w-72 right-0 md:right-[50%] bg-base-300 shadow-lg p-3 rounded-lg overflow-scroll max-h-56">
      {content}
    </div>
  );
};

export default Notification;
