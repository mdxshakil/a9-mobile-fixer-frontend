import { useParams } from "react-router-dom";
import { useGetBlogByIdQuery } from "../redux/features/blog/blogApi";
import LoadingSpinner from "../components/Loader/LoadingSpinner";

export const BlogDetailsPage = () => {
  const { blogId } = useParams();
  const { data: blog, isLoading } = useGetBlogByIdQuery(blogId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="w-full max-w-screen-lg rounded-lg p:6 md:p-12 mt-6">
        <div>
          <div className=" p-4 rounded-lg md:p-8">
            <h2 className="mb-3 text-2xl md:text-3xl font-extrabold text-accent">
              {blog?.data?.title}
            </h2>
            <div className="flex items-center gap-3 pb-3">
              <div className="avatar">
                <div className="w-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                  <img src={blog?.data?.profile?.profilePicture} />
                </div>
              </div>
              <p className="font-semibold text-sm">
                {blog?.data?.profile?.firstName +
                  " " +
                  blog?.data?.profile?.lastName}
              </p>
            </div>
            <p className="mb-3 text-gray-500">{blog?.data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
