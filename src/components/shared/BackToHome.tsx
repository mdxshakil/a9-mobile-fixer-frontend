import { Link } from "react-router-dom";

const BackToHome = () => {
  return (
    <div className="mx-auto">
      <Link to={"/"}>
        <button>Back to home</button>
      </Link>
    </div>
  );
};

export default BackToHome;
