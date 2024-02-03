import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

type IProps = {
  to: string;
};

const BrowseAllBtn = ({ to }: IProps) => {
  return (
    <div className="text-center">
      <Link to={to}>
        <button className="btn btn-primary rounded-lg border-0 btn-sm md:btn-md mt-3 md:mt-6 text-accent font-bold">
          Browse more
          <FaArrowRight />
        </button>
      </Link>
    </div>
  );
};

export default BrowseAllBtn;
