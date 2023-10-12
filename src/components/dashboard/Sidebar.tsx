import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{/* Page content here */}</div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <Link to="/dashboard">Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/add-new-admin">Add Admin</Link>
          </li>
          <li>
            <Link to="/dashboard/manage-admins">Manage Admins</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
