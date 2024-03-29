import { useNavigate } from "react-router-dom";
import HeroImage from "../assets/hero-image.jpg";
import { useState, FormEvent } from "react";
import { Fade } from "react-awesome-reveal";
import { FaSearch } from "react-icons/fa";
import CountUpSection from "./countUp/CountUpSection";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchText.length < 3) {
      setErrorMessage("Search text must be atleast 3 chracters");
      return;
    } else {
      setErrorMessage("");
      navigate(`/all-services?searchText=${searchText}`);
      setSearchText("");
    }
  };

  return (
    <Fade>
      <section className="min-h-screen flex flex-col items-center justify-center relative bg-hero-pattern">
        <div className="w-[200px] md:w-[400px] h-[100px] md:h-[150px] rounded-full bg-primary absolute -z-10 top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[90px] opacity-75"></div>
        {/* header text */}
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 min-h-[80vh] md:min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="max-w-4xl mx-auto mb-4 text-3xl text-accent sm:text-5xl lg:text-7xl font-extrabold">
              The best{" "}
              <span className="text-primary border border-primary rounded-lg shadow-md">
                mobile{" "}
              </span>
              repair service provider in{" "}
              <span className="border border-primary text-primary rounded-lg shadow-md">
                town
              </span>
            </h1>
            <p className="max-w-2xl mx-auto px-3 md:px-6 text-sm md:text-base font-inter">
              Offering unparalleled mobile services that set new standards in
              reliability, speed, and customer satisfaction.
            </p>

            <div className="px-8 sm:items-start sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-9">
              <div className="relative w-full sm:w-1/2">
                <form className="relative" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Display repair...."
                    className="w-full py-1 md:py-2 px-6 pr-16 text-gray-900 border-2 border-gray-300 rounded-full outline-none focus:border-primary border-transparent focus:border-opacity-50 shadow-md"
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                      setErrorMessage("");
                    }}
                  />
                  <button
                    type="submit"
                    className="absolute top-0 right-0 h-full px-4 md:px-6 font-bold text-accent"
                  >
                    <FaSearch />
                  </button>
                </form>
                {errorMessage && (
                  <p className="text-error text-sm">{errorMessage}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* header text end */}
        {/* image */}
        <div className="bg-base-100 w-full -mt-28">
          <div className="relative mx-auto mt-4 md:mt-8">
            <div className="lg:max-w-full lg:mx-auto">
              <img
                className="px-4 md:px-8 h-52 md:h-96 object-cover w-full"
                src={HeroImage}
                loading="lazy"
              />
            </div>
          </div>
        </div>
        {/* image end */}
        <div className="-mt-10 z-30 w-full px-8">
          <CountUpSection />
        </div>
      </section>
    </Fade>
  );
};

export default Header;
