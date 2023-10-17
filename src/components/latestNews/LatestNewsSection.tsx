import { Fade } from "react-awesome-reveal";
import { IBlog } from "../../interface";
import { useGetLatestBlogsQuery } from "../../redux/features/blog/blogApi";
import LoadingSpinner from "../Loader/LoadingSpinner";
import ErrorElement from "../shared/ErrorElement";
import NoContantFound from "../shared/NoContantFound";
import LatestNewsCard from "./LatestNewsCard";

const LatestNewsSection = () => {
  const {
    data: latestBlogs,
    isLoading,
    isError,
  } = useGetLatestBlogsQuery(undefined);

  let content;
  if (isLoading) {
    return <LoadingSpinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load news." />;
  } else if (!isLoading && !isError && latestBlogs?.data?.length === 0) {
    content = <NoContantFound message="No news available" />;
  } else if (!isLoading && !isError && latestBlogs?.data?.length > 0) {
    content = (
      <div className="grid md:grid-cols-3 gap-6">
        {latestBlogs?.data?.map((blog: IBlog) => (
          <LatestNewsCard blog={blog} key={blog.id} />
        ))}
      </div>
    );
  }

  return (
    <Fade direction="right">
      <div className="container my-12 mx-auto px-3 md:px-6">
        <section className="mb-32 text-center">
          <h2 className="mb-12 text-3xl font-bold">Latest News</h2>
          {content}
        </section>
      </div>
    </Fade>
  );
};

export default LatestNewsSection;
