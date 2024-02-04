import { Fade } from "react-awesome-reveal";
import { IBlog } from "../../interface";
import { useGetLatestBlogsQuery } from "../../redux/features/blog/blogApi";
import LoadingSpinner from "../Loader/LoadingSpinner";
import ErrorElement from "../shared/ErrorElement";
import NoContantFound from "../shared/NoContantFound";
import LatestNewsCard from "./LatestNewsCard";
import SectionTitle from "../SectionTitle";
import BrowseAllBtn from "../buttons/BrowseAllBtn";
import { useState } from "react";
import ScrollTrigger from "react-scroll-trigger";

const LatestNewsSection = () => {
  const [willSkip, setWillSkip] = useState(true);
  const {
    data: latestBlogs,
    isLoading,
    isError,
  } = useGetLatestBlogsQuery(undefined, { skip: willSkip });

  let content;
  if (isLoading) {
    return <LoadingSpinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load news." />;
  } else if (!isLoading && !isError && latestBlogs?.data?.length === 0) {
    content = <NoContantFound message="No news available" />;
  } else if (!isLoading && !isError && latestBlogs?.data?.length > 0) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {latestBlogs?.data?.map((blog: IBlog) => (
          <LatestNewsCard blog={blog} key={blog.id} />
        ))}
      </div>
    );
  }

  return (
    // @ts-ignore }
    <ScrollTrigger onEnter={() => setWillSkip(false)}>
      <Fade>
        <div className="container py-12 md:py-18 mx-auto">
          <section className="text-center mb-6">
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-center"></h1>
            </div>
            <SectionTitle
              title="Latest News"
              subTitle="Stay updated about new tech and gadgets"
            />
            {content}
          </section>
          <BrowseAllBtn to="/blogs" />
        </div>
      </Fade>
    </ScrollTrigger>
  );
};

export default LatestNewsSection;
