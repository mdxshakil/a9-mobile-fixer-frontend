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
import RequireSuperAdmin from "../components/ProtectRoute/RequireSuperAdmin";
import RequireAdmin from "../components/ProtectRoute/RequireAdmin";
import EditUserInfoPage from "../pages/Dashboard/admin/EditUserInfoPage";
import { EditEmailPage } from "../pages/Dashboard/admin/EditEmailPage";
import ManageBlogsPage from "../pages/Dashboard/admin/ManageBlogsPage";
import { AddNewBlogPage } from "../pages/Dashboard/admin/AddNewBlogPage";

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
        element: (
          <RequireSuperAdmin>
            <AddAdminPage />
          </RequireSuperAdmin>
        ),
      },
      {
        path: "manage-admins",
        element: (
          <RequireSuperAdmin>
            <ManageAdminsPage />
          </RequireSuperAdmin>
        ),
      },
      {
        path: "manage-users",
        element: (
          <RequireAdmin>
            <ManageUsersPage />
          </RequireAdmin>
        ),
      },
      {
        path: "edit-user-info/:profileId",
        element: (
          <RequireAdmin>
            <EditUserInfoPage />
          </RequireAdmin>
        ),
      },
      {
        path: "edit-email/:userId",
        element: (
          <RequireAdmin>
            <EditEmailPage />
          </RequireAdmin>
        ),
      },
      {
        path: "add-user",
        element: (
          <RequireAdmin>
            <AddUserPage />
          </RequireAdmin>
        ),
      },
      {
        path: "manage-services",
        element: (
          <RequireAdmin>
            <ManageServicesPage />
          </RequireAdmin>
        ),
      },
      {
        path: "add-service",
        element: (
          <RequireAdmin>
            <AddServicePage />
          </RequireAdmin>
        ),
      },
      {
        path: "manage-blogs",
        element: (
          <RequireAdmin>
            <ManageBlogsPage />
          </RequireAdmin>
        ),
      },
      {
        path: "add-new-blog",
        element: (
          <RequireAdmin>
            <AddNewBlogPage />
          </RequireAdmin>
        ),
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
