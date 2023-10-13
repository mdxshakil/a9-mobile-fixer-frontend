import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import Dashboard from "../layout/Dashboard";
import ProfilePage from "../pages/Dashboard/ProfilePage";
import EditProfilePage from "../pages/Dashboard/EditProfilePage";
import RequireAuth from "../components/ProtectRoute/RequireAuth";
import AddAdminPage from "../pages/Dashboard/AddAdminPage";
import ManageAdminsPage from "../pages/Dashboard/ManageAdminsPage";
import ManageUsersPage from "../pages/Dashboard/admin/ManageUsersPage";
import ManageServicesPage from "../pages/Dashboard/admin/ManageServicesPage";
import AddUserPage from "../pages/Dashboard/admin/AddUserPage";
import AddServicePage from "../pages/Dashboard/admin/AddServicePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <RequireAuth>
        <Dashboard />
      </RequireAuth>
    ),
    children: [
      {
        path: "",
        element: <ProfilePage />,
      },
      {
        path: "edit-profile",
        element: <EditProfilePage />,
      },
      {
        path: "add-new-admin",
        element: <AddAdminPage />,
      },
      {
        path: "manage-admins",
        element: <ManageAdminsPage />,
      },
      {
        path: "manage-users",
        element: <ManageUsersPage />,
      },
      {
        path: "add-user",
        element: <AddUserPage />,
      },
      {
        path: "manage-services",
        element: <ManageServicesPage />,
      },
      {
        path: "add-service",
        element: <AddServicePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
]);

export default router;
