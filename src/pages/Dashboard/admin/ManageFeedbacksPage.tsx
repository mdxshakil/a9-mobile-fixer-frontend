import { useState, FormEvent } from "react";
import LoadingSpinner from "../../../components/Loader/LoadingSpinner";
import ErrorElement from "../../../components/shared/ErrorElement";
import NoContantFound from "../../../components/shared/NoContantFound";
import PaginationButton from "../../../components/pagination/PaginationButton";
import { IFeedback } from "../../../interface";
import { useGetAllFeedbackQuery } from "../../../redux/features/feedback/feedbackApi";

const ManageFeedbacksPage = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const {
    data: feedbacks,
    isLoading,
    isError,
  } = useGetAllFeedbackQuery({ page, sortBy, sortOrder, limit: 20 });

  const isPreviousButtonDisabled = page === 1;
  const isNextButtonDisabled = page === feedbacks?.data?.meta?.pageCount;

  const handleSortByAndSortOrder = (e: FormEvent<HTMLSelectElement>) => {
    setSortBy("createdAt");
    setSortOrder(e.currentTarget.value);
  };

  let content;
  if (isLoading) {
    return <LoadingSpinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load feedbacks." />;
  } else if (!isLoading && !isError && feedbacks?.data?.data?.length === 0) {
    content = <NoContantFound message="No feedback available" />;
  } else if (!isLoading && !isError && feedbacks?.data?.data?.length > 0) {
    content = (
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks?.data?.data?.map((feedback: IFeedback) => {
            return (
              <tr key={feedback.id}>
                <td>{feedback.email}</td>
                <td>
                  <td>{feedback.message}</td>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <div className="p-3">
      <div>
        <div className="my-3 flex justify-center">
          {/* sort feedbacks - createdAt*/}
          <select
            className="select"
            onChange={(e) => handleSortByAndSortOrder(e)}
            value={sortOrder}
          >
            <option defaultValue={sortOrder} value={"asc"}>
              Added First
            </option>
            <option value={"desc"}>Added last</option>
          </select>
        </div>
        <p>Total feedbacks: {feedbacks?.data?.meta?.total}</p>
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

export default ManageFeedbacksPage;
