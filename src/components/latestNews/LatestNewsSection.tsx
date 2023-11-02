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
      <div className="container py-12 md:py-24 mx-auto px-3 md:px-6">
        <section className="text-center">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-center">
              Latest News
            </h1>
            <p>Stay updated about new tech and gadgets</p>
          </div>
          {content}
        </section>
      </div>
    </Fade>
  );
};

export default LatestNewsSection;
