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
import FeaturedNewsCard from "./FeaturedNewsCard";

const LatestNewsSection = () => {
  const [willSkip, setWillSkip] = useState(true);
  const {
    data: latestBlogs,
    isLoading,
    isError,
  } = useGetLatestBlogsQuery(undefined, { skip: willSkip });

  let content;
  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load news." />;
  } else if (!isLoading && !isError && latestBlogs?.data?.length === 0) {
    content = <NoContantFound message="No news available" />;
  } else if (!isLoading && !isError && latestBlogs?.data?.length > 0) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 place-items-center">
        <FeaturedNewsCard blog={latestBlogs?.data && latestBlogs.data[0]} />
        <div className="col-span-12 md:col-span-4 p-3 flex flex-col gap-y-2">
          {latestBlogs?.data?.slice(1).map((blog: IBlog) => (
            <LatestNewsCard key={blog?.id} blog={blog} />
          ))}
        </div>
      </div>
    );
  }

  return (
    // @ts-ignore }
    <ScrollTrigger onEnter={() => setWillSkip(false)}>
      <Fade>
        <div className="container py-12 md:py-18 mx-auto">
          <section className="mb-6">
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-center"></h1>
            </div>
            <SectionTitle
              title="Latest Blogs"
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
