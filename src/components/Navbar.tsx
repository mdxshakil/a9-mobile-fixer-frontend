import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useGetUserFromStore from "../hooks/useGetUser";
import { useAppDispatch } from "../redux/hooks";
import { userLoggedOut } from "../redux/features/auth/authSlice";
import { FaCartArrowDown } from "react-icons/fa";

const Navbar = () => {
  const { profilePicture } = useGetUserFromStore();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    dispatch(userLoggedOut());
    navigate("/");
  };

  return (
    <div className="navbar bg-base-300 rounded-lg">
      <div className="navbar-start">
        {pathname.includes("dashboard") && (
          <div className="dropdown">
            <label htmlFor="my-drawer" className="btn drawer-button">
              <GiHamburgerMenu />
            </label>
          </div>
        )}
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
          mobileFix
        </Link>
      </div>
      <div className="navbar-center hidden md:block">
        <Link className="m-2" to="/blogs">
          Blogs
        </Link>
        <Link className="m-2" to="#faq-section">
          FAQ
        </Link>
      </div>
      <div className="navbar-end">
        {!profilePicture ? (
          <Link to={"/login"}>
            <button className="btn btn-sm rounded-full btn-primary">
              Login
            </button>
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <div className="flex gap-3 items-center">
              <FaCartArrowDown size={25} />
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
              <li className="block md:hidden">
                <Link to="/blogs">Blogs</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
