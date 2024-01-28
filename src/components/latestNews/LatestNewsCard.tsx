import { AiOutlineLink } from "react-icons/ai";
import { FaNewspaper } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IBlog } from "../../interface";

const LatestNewsCard = ({ blog }: { blog: IBlog }) => {
  const { title, description, id } = blog || {};
  return (
    <div className="p-6 border border-gray-200 rounded-lg text-start flex flex-col justify-between">
      <div>
        <FaNewspaper size={25} className="text-primary" />
        <h5 className="mb-2 text-sm md:text-xl font-semibold tracking-tighter md:tracking-tight text-gray-900 text-start">
          {title}
        </h5>
        <p className="mb-3 font-normal text-sm text-gray-500">
          {description.slice(0, 100)}....
        </p>
      </div>
      <div className="text-end">
        <Link
          to={`/blog/${id}`}
          className="inline-flex items-center text-primary text-sm hover:underline"
        >
          Read news
          <AiOutlineLink />
        </Link>
      </div>
    </div>
  );
};

export default LatestNewsCard;
