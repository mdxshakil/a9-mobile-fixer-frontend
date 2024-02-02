import { Link } from "react-router-dom";

type IProps = {
  to: string;
  text: string;
};

const BrowseAllBtn = ({ to, text }: IProps) => {
  return (
    <div className="text-center">
      <Link to={to}>
        <button className="btn btn-primary btn-sm md:btn-md mt-3 md:mt-6 text-accent">
          {text}
        </button>
      </Link>
    </div>
  );
};

export default BrowseAllBtn;
