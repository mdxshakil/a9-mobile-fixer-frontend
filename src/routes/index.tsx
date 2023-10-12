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
