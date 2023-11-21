import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useGetUserFromStore from "../hooks/useGetUser";
import { useAppDispatch } from "../redux/hooks";
import { userLoggedOut } from "../redux/features/auth/authSlice";
import { FaCartArrowDown } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import Notification from "./notification/Notification";

const links = [
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    dispatch(userLoggedOut());
    navigate("/");
  };

  return (
    <div className="navbar bg-base-300 rounded-lg sticky top-0 z-50">
      <div className="navbar-start">
        {pathname.includes("dashboard") && (
          <div className="dropdown">
            <label htmlFor="my-drawer" className="btn drawer-button">
              <GiHamburgerMenu />
            </label>
          </div>
        )}
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
          iRepair
        </Link>
      </div>
      <div className="navbar-center hidden md:flex gap-6 font-bold">
        {links.map((link, i) => (
          <p key={i} className="hover:border-b-2 border-primary">
            <Link className="m-2" to={link.path}>
              {link.label}
            </Link>
          </p>
        ))}
      </div>
      <div className="navbar-end">
        {!profilePicture ? (
          <Link to={"/login"}>
            <button className="btn btn-sm rounded-full btn-primary">
              Login
            </button>
          </Link>
        ) : (
          <div>
            {role === "user" && (
              <div className="dropdown">
                <button className="btn btn-ghost btn-circle">
                  <IoNotificationsSharp size={20} />
                </button>
                <Notification />
              </div>
            )}

            {role === "user" && (
              <button>
                <Link to={`/my-cart/${profileId}`}>
                  <FaCartArrowDown size={25} />
                </Link>
              </button>
            )}
            <div className="dropdown dropdown-end ml-3 z-50">
              <div className="flex gap-3 items-center">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={profilePicture} />
                  </div>
                </label>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to={"/dashboard"}>Dashboard</Link>
                </li>
                {links.map((link, i) => (
                  <li key={i} className="block md:hidden">
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
