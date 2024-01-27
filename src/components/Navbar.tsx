import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import useGetUserFromStore from "../hooks/useGetUser";
import { FaCartArrowDown } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import Notification from "./notification/Notification";
import NavLogo from "../assets/nav-logo.svg";
import NavigationLink from "./NavigationLink";
import MobileNavDropDown from "./MobileNavDropdown";
import Container from "./Container";

const links = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Blogs",
    path: "/blogs",
  },
  {
    label: "Events",
    path: "/all-events",
  },
  {
    label: "Services",
    path: "/all-services",
  },
];

const Navbar = () => {
  const { profilePicture, profileId, role } = useGetUserFromStore();
  const { pathname } = useLocation();

  return (
    <div className="w-full bg-base-300/30 backdrop-blur-lg sticky top-0 z-50 ">
      <Container>
        <div className="navbar rounded-lg">
          <div className="navbar-start">
            {/* dashboard sidebar links */}
            {pathname.includes("dashboard") && (
              <div className="dropdown">
                <label htmlFor="my-drawer" className="btn drawer-button">
                  <GiHamburgerMenu />
                </label>
              </div>
            )}
            {/* dashboard sidebar links end */}
            {/* logo start */}
            <Link to="/">
              <img src={NavLogo} alt="" className="w-2/3 md:w-1/2 p-2" />
            </Link>
            {/* logo end */}
          </div>
          {/* desktop nav links */}
          <div className="navbar-center hidden md:flex gap-6 font-semibold">
            {links.map((link, i) => (
              <NavigationLink key={i} link={link} />
            ))}
          </div>
          {/* desktop nav links end */}
          {/* login, profile and mobile nav button */}
          <div className="navbar-end">
            {!role ? (
              <Link to={"/login"}>
                <button className="btn btn-sm rounded-full btn-primary text-gray-900 font-bold">
                  Login
                </button>
              </Link>
            ) : (
              <div className="flex items-center">
                {role === "user" && (
                  <>
                    <div className="dropdown">
                      <button className="btn btn-ghost btn-circle">
                        <IoNotificationsSharp size={20} color="#111827" />
                      </button>
                      <Notification />
                    </div>
                    <button className="btn btn-ghost btn-circle">
                      <Link to={`/my-cart/${profileId}`}>
                        <FaCartArrowDown size={20} color="#111827" />
                      </Link>
                    </button>
                  </>
                )}

                <MobileNavDropDown>
                  <img
                    src={profilePicture}
                    className="w-10 h-10 object-cover rounded-full border-2 border-primary"
                  />
                </MobileNavDropDown>
              </div>
            )}
            {/* mobile nav */}
            {!role && (
              <MobileNavDropDown>
                <GiHamburgerMenu size={30} />
              </MobileNavDropDown>
              // mobile nav end
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
