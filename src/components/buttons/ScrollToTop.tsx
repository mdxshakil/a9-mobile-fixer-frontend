import { useEffect, useState } from "react";
import { RiArrowUpDoubleLine } from "react-icons/ri";

const ScrollToTop = () => {
  const [show, setShow] = useState(window.scrollY > 300);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname);
    };
    handlePathChange();

    // event listener to handle path changes
    window.addEventListener("popstate", handlePathChange);
    return () => {
      // Clean up the event listener when the component is unmounted
      window.removeEventListener("popstate", handlePathChange);
    };
  }, []);

  useEffect(() => {
    if (currentPath === "/login" || currentPath === "/signup") {
      setShow(false);
    } else {
      setShow(window.scrollY > 400); // Update show based on the initial scroll position
    }
  }, [currentPath]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return !show ? null : (
    <button
      className="btn btn-primary btn-circle fixed bottom-2 right-2 btn-md z-50 text-accent"
      onClick={() => window.scrollTo(0, 0)}
    >
      <RiArrowUpDoubleLine size={25} className="animate-bounce" />
    </button>
  );
};

export default ScrollToTop;
