import BlogCard from "../components/BlogCard";
import LoadingSpinner from "../components/Loader/LoadingSpinner";
import PaginationButton from "../components/pagination/PaginationButton";
import ErrorElement from "../components/shared/ErrorElement";
import NoContantFound from "../components/shared/NoContantFound";
import { IBlog } from "../interface";
import { useGetAllBlogsQuery } from "../redux/features/blog/blogApi";
import { useState, FormEvent } from "react";

export const AllBlogsPage = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");

  const {
    data: blogs,
    isLoading,
    isError,
  } = useGetAllBlogsQuery({
    page,
    sortBy,
    sortOrder,
    limit: 10,
  });

  const isPreviousButtonDisabled = page === 1;
  const isNextButtonDisabled = page === blogs?.data?.meta?.pageCount;

  const handleSortByAndSortOrder = (e: FormEvent<HTMLSelectElement>) => {
    setSortBy("createdAt");
    setSortOrder(e.currentTarget.value);
  };

  let content;
  if (isLoading) {
    return <LoadingSpinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load blogs." />;
  } else if (!isLoading && !isError && blogs?.data?.data?.length === 0) {
    content = <NoContantFound message="No blogs available" />;
  } else if (!isLoading && !isError && blogs?.data?.data?.length > 0) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {blogs?.data?.data.map((blog: IBlog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
  return (
    <div>
      <div className="my-3 flex justify-center">
        {/* sort users - createdAt*/}
        <select
          className="select"
          onChange={(e) => handleSortByAndSortOrder(e)}
          value={sortOrder}
        >
          <option defaultValue={sortOrder} value={"asc"}>
            Oldest
          </option>
          <option value={"desc"}>Latest</option>
        </select>
      </div>
      <p>Total blogs: {blogs?.data?.meta?.total}</p>
      <div>{content}</div>
      <div>
        <PaginationButton
          setPage={setPage}
          isPreviousButtonDisabled={isPreviousButtonDisabled}
          isNextButtonDisabled={isNextButtonDisabled}
          currentPage={page}
        />
      </div>
    </div>
  );
};
