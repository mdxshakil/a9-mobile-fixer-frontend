import { Link } from "react-router-dom";
import { IBlog } from "../interface";

const BlogCard = ({ blog }: { blog: IBlog }) => {
  const { title, description, profile, id } = blog || {};
  const { firstName, lastName, profilePicture } = profile || {};

  return (
    <div className="card shadow-md bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description.slice(0, 60)}....</p>
        <div className="card-actions justify-between items-center">
          <div className="flex items-center gap-3 py-3">
            <div className="avatar">
              <div className="w-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                <img src={profilePicture} alt={firstName} />
              </div>
            </div>
            <p className="font-semibold text-sm">
              {firstName + " " + lastName}
            </p>
          </div>
          <button className="btn btn-xs btn-ghost">
            <Link to={`/blog/${id}`}>Read More</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
