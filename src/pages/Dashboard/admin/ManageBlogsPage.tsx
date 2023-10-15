import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, FormEvent, useEffect } from "react";
import {
  useDeleteBlogByIdMutation,
  useGetAllBlogsQuery,
} from "../../../redux/features/blog/blogApi";
import LoadingSpinner from "../../../components/Loader/LoadingSpinner";
import ErrorElement from "../../../components/shared/ErrorElement";
import NoContantFound from "../../../components/shared/NoContantFound";
import PaginationButton from "../../../components/pagination/PaginationButton";
import { IBlog } from "../../../interface";
import toast from "react-hot-toast";
import { deleteConfirmationModal } from "../../../utils/deleteConfirmationModal";

const ManageBlogsPage = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");

  const {
    data: blogs,
    isLoading,
    isError,
  } = useGetAllBlogsQuery({ page, sortBy, sortOrder, limit: 10 });
  const [deleteBlog, deleteBlogState] = useDeleteBlogByIdMutation();

  const isPreviousButtonDisabled = page === 1;
  const isNextButtonDisabled = page === blogs?.data?.meta?.pageCount;

  const handleSortByAndSortOrder = (e: FormEvent<HTMLSelectElement>) => {
    setSortBy("createdAt");
    setSortOrder(e.currentTarget.value);
  };

  const handleBlogDelete = async (blogId: string) => {
    deleteConfirmationModal(
      "Are you sure?",
      "You won't be able to revert this!",
      () => deleteBlog(blogId)
    );
  };

  useEffect(() => {
    if (deleteBlogState.isSuccess) {
      toast.success("Action succed!");
    }
    if (deleteBlogState.isError) {
      toast.error("Action failed.Try again");
    }
  }, [deleteBlogState]);

  if (deleteBlogState.isLoading) {
    return <LoadingSpinner />;
  }

  let content;
  if (isLoading) {
    return <LoadingSpinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load blogs." />;
  } else if (!isLoading && !isError && blogs?.data?.data?.length === 0) {
    content = <NoContantFound message="No blogs available" />;
  } else if (!isLoading && !isError && blogs?.data?.data?.length > 0) {
    content = (
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.data?.data?.map((blog: IBlog) => {
            return (
              <tr key={blog.id}>
                <td className="cursor-pointer hover:text-primary">
                  <Link to={`/blog/${blog.id}`}>
                    <span>{blog.title}</span>
                  </Link>
                </td>
                <td>{blog.profile.firstName + " " + blog.profile.lastName}</td>
                <td>
                  <div className="flex gap-1">
                    <Link to={`/dashboard/edit-blog/${blog.id}`}>
                      <button className="btn btn-xs btn-ghost btn-info">
                        <FaEdit size={20} />
                      </button>
                    </Link>
                    <button
                      className="btn btn-xs btn-ghost btn-error"
                      onClick={() => handleBlogDelete(blog.id)}
                    >
                      <FaTrash size={20} />
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
    <div>
      <div className="py-3">
        <Link to="/dashboard/add-new-blog">
          <button className="btn btn-sm btn-primary ">
            Add New Blog <FaPlus />{" "}
          </button>
        </Link>
      </div>

      <div>
        <div className="my-3 flex justify-center">
          {/* sort users - createdAt*/}
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
        <p>Total blogs: {blogs?.data?.meta?.total}</p>
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

export default ManageBlogsPage;
