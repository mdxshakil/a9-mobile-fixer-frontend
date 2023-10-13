import { Link, useLocation } from "react-router-dom";
import useGetUserFromStore from "../../hooks/useGetUser";
import { SidebarLinks } from "../../constants/dashboard";

const Sidebar = () => {
  const { role } = useGetUserFromStore();
  const location = useLocation().pathname;
  const sidebarLinks = SidebarLinks(location, role);

  return (
    <div className="drawer z-50">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content"></div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {sidebarLinks?.map((link) => (
            <li
              key={link.id}
              className={`${link.isActive ? "bg-base-300" : ""}`}
            >
              <Link to={link.path}>
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
