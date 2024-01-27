import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { userLoggedOut } from "../redux/features/auth/authSlice";
import { ReactElement } from "react";
import useGetUserFromStore from "../hooks/useGetUser";

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

const MobileNavDropDown = ({ children }: { children: ReactElement }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { role } = useGetUserFromStore();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    dispatch(userLoggedOut());
    navigate("/");
  };

  return (
    <div className="dropdown dropdown-end ml-3 z-50">
      <div className="flex gap-3 items-center">
        <label
          tabIndex={0}
          className="btn btn-ghost hover:bg-transparent px-2 py-0"
        >
          <div>{children}</div>
        </label>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-primary rounded-box w-52 font-semibold text-accent"
      >
        <li>
          <Link to={"/dashboard"}>Dashboard</Link>
        </li>
        {links.map((link, i) => (
          <li key={i} className="block md:hidden">
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
        {role && (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default MobileNavDropDown;
