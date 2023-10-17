import { AiOutlineLink } from "react-icons/ai";
import { FaNewspaper } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IBlog } from "../../interface";

const LatestNewsCard = ({ blog }: { blog: IBlog }) => {
  const { title, description, id } = blog || {};
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
      <FaNewspaper size={25} />
      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
        {title}
      </h5>
      <p className="mb-3 font-normal text-gray-500">
        {description.slice(0, 60)}....
      </p>
      <Link
        to={`/blog/${id}`}
        className="inline-flex items-center text-blue-600 hover:underline"
      >
        Read full news
        <AiOutlineLink />
      </Link>
    </div>
  );
};

export default LatestNewsCard;
