import { FaTools } from "react-icons/fa";
const LoadingSpinner = () => {
  return (
    <div className="relative flex justify-center items-center h-screen">
      <div className="absolute animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
      <FaTools className="rounded-full h-8 w-8 animate-spin text-accent" />
    </div>
  );
};

export default LoadingSpinner;
