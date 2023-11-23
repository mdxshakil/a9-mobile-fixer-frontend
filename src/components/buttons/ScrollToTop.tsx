import { RiArrowUpDoubleLine } from "react-icons/ri";

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <button
      className="btn btn-primary rounded-full fixed bottom-4 md:bottom-6 right-4 md:right-6 btn-sm md:btn-md opacity-80 z-50 text-white"
      onClick={scrollToTop}
    >
      <RiArrowUpDoubleLine size={25} className="animate-bounce" />
    </button>
  );
};

export default ScrollToTop;
