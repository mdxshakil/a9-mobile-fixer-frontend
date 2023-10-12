import { FaTools } from "react-icons/fa";
const LoadingSpinner = () => {
  return (
    <div className="relative flex justify-center items-center h-screen">
      <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary"></div>
      <FaTools className="rounded-full h-24 w-24 animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
