import TestimonialForm from "./TestimonialForm";
import Logo from "../../assets/nav-logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-100">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2">
          <div className="border-b border-gray-100 py-8 lg:order-last lg:border-b-0 lg:border-s lg:py-16 lg:ps-16">
            <div className="block text-teal-600 lg:hidden">
              <Link to="/">
                <img src={Logo} alt="Logo" className="w-1/3" />
              </Link>
            </div>
            <TestimonialForm />
          </div>

          <div className="py-8 lg:py-16 lg:pe-16">
            <div className="hidden text-teal-600 lg:block">
              <Link to="/">
                <img src={Logo} alt="Logo" className="w-1/3" />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <p className="font-medium text-gray-900">Services</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Hardware
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Software
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Other
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-gray-900">Company</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      About
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Meet the Team
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-gray-900">Helpful Links</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a className="text-gray-700 transition hover:opacity-75">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-700 transition hover:opacity-75">
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-700 transition hover:opacity-75">
                      Live Chat
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="my-6 border-t border-gray-100 text-center">
          <ul className="flex flex-wrap gap-4 text-xs items-center justify-center">
            <li>
              <a href="#" className="text-gray-500 transition hover:opacity-75">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-500 transition hover:opacity-75">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-500 transition hover:opacity-75">
                Cookies
              </a>
            </li>
          </ul>
          <p className="mt-8 text-xs text-gray-500">
            &copy; 2024. irepair, All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
