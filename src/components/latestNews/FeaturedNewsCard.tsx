import moment from "moment";
import { IBlog } from "../../interface";
import { Link } from "react-router-dom";
import { AiOutlineLink } from "react-icons/ai";

const FeaturedNewsCard = ({ blog }: { blog: IBlog }) => {
  const { title, description, id, createdAt, profile } = blog || {};

  return (
    <div className="col-span-12 md:col-span-8 p-3">
      <div className="mt-3 rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
        <div className="lg:pl-16">
          <div className="flex items-center mb-2">
            <img
              src={profile.profilePicture}
              alt="Avatar"
              className="w-16 h-16 object-cover rounded-full mr-4"
            />
            <div>
              <div className="text-lg font-bold text-accent">
                {" "}
                {profile.firstName + " " + profile.lastName}
              </div>
              <div className="text-sm text-accent/60">
                {moment(createdAt).format("ll")}
              </div>
            </div>
          </div>
          <h1
            className="text-accent font-bold text-xl md:text-3xl mb-2 hover:text-primary transition duration-500 ease-in-out"
          >
            {title}
          </h1>
          <p className="text-base md:text-lg text-accent/80 mt-2 w-full md:w-5/6">
            {description}
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
      </div>
    </div>
  );
};

export default FeaturedNewsCard;
