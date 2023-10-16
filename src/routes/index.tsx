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
import RequireSuperAdmin from "../components/ProtectRoute/RequireSuperAdmin";
import RequireAdmin from "../components/ProtectRoute/RequireAdmin";
import EditUserInfoPage from "../pages/Dashboard/admin/EditUserInfoPage";
import { EditEmailPage } from "../pages/Dashboard/admin/EditEmailPage";
import ManageBlogsPage from "../pages/Dashboard/admin/ManageBlogsPage";
import { AddNewBlogPage } from "../pages/Dashboard/admin/AddNewBlogPage";
import { BlogDetailsPage } from "../pages/BlogDetailsPage";
import { AllBlogsPage } from "../pages/AllBlogsPage";
import { EditBlogPage } from "../pages/Dashboard/admin/EditBlogPage";
import ManageFaqsPage from "../pages/Dashboard/admin/ManageFaqsPage";
import AddNewFaqPage from "../pages/Dashboard/admin/AddNewFaqPage";
import EditFaqPage from "../pages/Dashboard/admin/EditFaqPage";
import { AddServicePage } from "../pages/Dashboard/admin/AddServicePage";
import AllServicesPage from "../pages/AllServicesPage";
import { EditServicePage } from "../pages/Dashboard/admin/EditServicePage";
import MyCartPage from "../pages/MyCartPage";
import ConfirmBookingPage from "../pages/ConfirmBookingPage";
import MyOrdersPage from "../pages/MyOrdersPage";
import ManageBookingPage from "../pages/Dashboard/admin/ManageBookingPage";
import ServiceDetailsPage from "../pages/ServiceDetailsPage";
import NotFoundPage from "../pages/NotFoundPage";
import ManageFeedbacksPage from "../pages/Dashboard/admin/ManageFeedbacksPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/blog/:blogId",
        element: <BlogDetailsPage />,
      },
      {
        path: "/blogs",
        element: <AllBlogsPage />,
      },
      {
        path: "/all-services",
        element: <AllServicesPage />,
      },
      {
        path: "/service/:serviceId",
        element: <ServiceDetailsPage />,
      },
      {
        path: "/my-cart/:profileId",
        element: (
          <RequireAuth>
            <MyCartPage />
          </RequireAuth>
        ),
      },
      {
        path: "/confirm-booking/:cartItemId",
        element: (
          <RequireAuth>
            <ConfirmBookingPage />
          </RequireAuth>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <RequireAuth>
            <MyOrdersPage />
          </RequireAuth>
        ),
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
        path: "edit-service/:serviceId",
        element: (
          <RequireAdmin>
            <EditServicePage />
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
      {
        path: "edit-blog/:blogId",
        element: (
          <RequireAdmin>
            <EditBlogPage />
          </RequireAdmin>
        ),
      },
      {
        path: "manage-faqs",
        element: (
          <RequireAdmin>
            <ManageFaqsPage />
          </RequireAdmin>
        ),
      },
      {
        path: "add-new-faq",
        element: (
          <RequireAdmin>
            <AddNewFaqPage />
          </RequireAdmin>
        ),
      },
      {
        path: "edit-faq/:faqId",
        element: (
          <RequireAdmin>
            <EditFaqPage />
          </RequireAdmin>
        ),
      },
      {
        path: "manage-bookings",
        element: (
          <RequireAdmin>
            <ManageBookingPage />
          </RequireAdmin>
        ),
      },
      {
        path: "manage-feedbacks",
        element: (
          <RequireAdmin>
            <ManageFeedbacksPage />
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
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
