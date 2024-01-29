import { useState, FormEvent, useEffect } from "react";
import LoadingSpinner from "../../../components/Loader/LoadingSpinner";
import ErrorElement from "../../../components/shared/ErrorElement";
import NoContantFound from "../../../components/shared/NoContantFound";
import PaginationButton from "../../../components/pagination/PaginationButton";
import { ITestimonial } from "../../../interface";
import {
  useApproveUnApproveTestimonialMutation,
  useDeleteTestimonialMutation,
  useGetAllTestimonialQuery,
} from "../../../redux/features/testimonial/testimonialApi";
import { deleteConfirmationModal } from "../../../utils/deleteConfirmationModal";
import toast from "react-hot-toast";
import SectionTitle from "../../../components/SectionTitle";

const ManageTestimonialsPage = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [deleteTestimonial, deleteState] = useDeleteTestimonialMutation();
  const [approveTestimonial, approveState] =
    useApproveUnApproveTestimonialMutation();
  const {
    data: testimonials,
    isLoading,
    isError,
  } = useGetAllTestimonialQuery({ page, sortBy, sortOrder, limit: 20 });

  const isPreviousButtonDisabled = page === 1;
  const isNextButtonDisabled = page === testimonials?.data?.meta?.pageCount;

  const handleSortByAndSortOrder = (e: FormEvent<HTMLSelectElement>) => {
    setSortBy("createdAt");
    setSortOrder(e.currentTarget.value);
  };

  const handleDeleteTestimonial = async (testimonialId: string) => {
    deleteConfirmationModal(
      "Are you sure?",
      "You won't be able to revert this!",
      () => deleteTestimonial(testimonialId)
    );
  };

  const handleApproveTestimonial = async (
    testimonialId: string,
    action: string
  ) => {
    approveTestimonial({ testimonialId, action });
  };

  useEffect(() => {
    if (deleteState.isSuccess || approveState.isSuccess) {
      toast.success("Action succed!");
    }
    if (deleteState.isError || approveState.isError) {
      toast.error("Action failed.Try again");
    }
  }, [deleteState, approveState]);

  let content;
  if (isLoading) {
    return <LoadingSpinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load testimonials." />;
  } else if (!isLoading && !isError && testimonials?.data?.data?.length === 0) {
    content = <NoContantFound message="No testimonial available" />;
  } else if (!isLoading && !isError && testimonials?.data?.data?.length > 0) {
    content = (
      <table className="table">
        <thead>
          <tr>
            <th>Author</th>
            <th>Message</th>
            <th>Experience</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {testimonials?.data?.data?.map((testimonial: ITestimonial) => {
            return (
              <tr key={testimonial.id}>
                <td>
                  {testimonial.profile.firstName +
                    " " +
                    testimonial.profile.lastName}
                </td>
                <td>{testimonial.message}</td>
                <td>{testimonial.experience}</td>
                <td>{testimonial.isApproved ? "Approved" : "Not Approved"}</td>
                <td>
                  <div className="flex gap-1">
                    {!testimonial.isApproved ? (
                      <button
                        className={`btn btn-xs btn-success ${
                          approveState.isLoading ? "loading" : ""
                        }`}
                        onClick={() =>
                          handleApproveTestimonial(testimonial.id, "approve")
                        }
                        disabled={approveState.isLoading}
                      >
                        Approve
                      </button>
                    ) : (
                      <button
                        className={`btn btn-xs btn-warning ${
                          approveState.isLoading ? "loading" : ""
                        }`}
                        onClick={() =>
                          handleApproveTestimonial(testimonial.id, "un_approve")
                        }
                        disabled={approveState.isLoading}
                      >
                        UnApprove
                      </button>
                    )}
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDeleteTestimonial(testimonial.id)}
                    >
                      Delete
                    </button>
                  </div>
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
      <SectionTitle title="Manage Testimonials" titleClasses="text-xl" />
      <div>
        <div>
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
        <p className="text-primary text-sm md:text-lg">
          Total testimonials: {testimonials?.data?.meta?.total}
        </p>
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

export default ManageTestimonialsPage;
