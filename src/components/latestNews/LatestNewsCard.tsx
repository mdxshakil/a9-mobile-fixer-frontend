import { Link } from "react-router-dom";
import { IBlog } from "../../interface";
import { AiOutlineLink } from "react-icons/ai";
import moment from "moment";

const LatestNewsCard = ({ blog }: { blog: IBlog }) => {
  const { title, description, id, createdAt, profile } = blog || {};

  return (
    <div className="shadow-sm shadow-primary/30 px-3 py-2 rounded-lg">
      <div className="flex items-center mb-2">
        <img
          src={profile?.profilePicture}
          alt="Avatar"
          className="w-8 h-8 rounded-full object-cover mr-4"
        />
        <div>
          <div className="text-sm font-medium text-accent">
            {profile.firstName + " " + profile.lastName}
          </div>
          <div className="text-xs text-accent/60">
            {moment(createdAt).format("ll")}
          </div>
        </div>
      </div>
      <p className="text-sm font-bold leading-tight mb-1">{title}</p>
      <p className="text-xs leading-tight mb-1">
        {description.slice(0, 50)}...
      </p>
      <div>
        <Link
          to={`/blog/${id}`}
          className="inline-flex gap-1 items-center text-sm text-primary hover:text-accent"
        >
          Read blog
          <AiOutlineLink />
        </Link>
      </div>
    </div>
  );
};

export default LatestNewsCard;
