import { useNavigate } from "react-router-dom";
import HeroImage from "../assets/hero-image.jpg";
import { useState, FormEvent } from "react";
import { Fade } from "react-awesome-reveal";

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
      <section className="pt-12 bg-gray-50 sm:pt-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="max-w-4xl mx-auto mb-4 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight">
              The best mobile service provider is here
            </p>
            <h1 className="max-w-2xl mx-auto px-3 md:px-6 text-sm md:text-lg text-gray-600 font-inter">
              Offering unparalleled mobile services that set new standards in
              reliability, speed, and customer satisfaction. Experience the
              excellence in mobile service.
            </h1>

            <div className="px-8 sm:items-start sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-9">
              <div className="relative w-full sm:w-1/2">
                <form className="relative" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Display repair...."
                    className="w-full py-3 px-6 pr-16 text-gray-900 bg-white border-2 border-gray-300 rounded-full outline-none"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute top-0 right-0 h-full px-4 md:px-8 bg-gray-900 text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  >
                    Search
                  </button>
                </form>
                {errorMessage && (
                  <p className="text-error text-sm">{errorMessage}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="relative mx-auto mt-4 md:mt-8">
            <div className="lg:max-w-full lg:mx-auto">
              <img
                className="px-4 md:px-8 h-52 md:h-96 object-cover w-full"
                src={HeroImage}
              />
            </div>
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default Header;
