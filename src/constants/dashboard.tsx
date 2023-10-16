import {
  AiFillBook,
  AiFillFileAdd,
  AiFillQuestionCircle,
  AiFillTrophy,
  AiOutlineComment,
} from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { FaAddressBook } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";

export const SidebarLinks = (location: string, userRole: string) => {
  const adminDashboardSidebarLinks = [
    {
      id: 1,
      path: "/dashboard",
      icon: <RxAvatar className="text-sm md:text-xl" />,
      label: "Profile",
      isActive: location === "/dashboard",
    },
    {
      id: 2,
      path: "/dashboard/manage-users",
      icon: <BiSolidDashboard className="text-sm md:text-xl" />,
      label: "Manage Users",
      isActive: location === "/dashboard/manage-users",
    },
    {
      id: 3,
      path: "/dashboard/manage-bookings",
      icon: <BiSolidDashboard className="text-sm md:text-xl" />,
      label: "Manage Bookings",
      isActive: location === "/dashboard/manage-bookings",
    },
    {
      id: 4,
      path: "/dashboard/manage-services",
      icon: <AiFillBook className="text-sm md:text-xl" />,
      label: "Manage Services",
      isActive: location === "/dashboard/manage-services",
    },
    {
      id: 6,
      path: "/dashboard/manage-blogs",
      icon: <AiFillBook className="text-sm md:text-xl" />,
      label: "Manage Blogs",
      isActive: location === "/dashboard/manage-blogs",
    },
    {
      id: 7,
      path: "/dashboard/manage-faqs",
      icon: <AiFillQuestionCircle className="text-sm md:text-xl" />,
      label: "Manage FAQ's",
      isActive: location === "/dashboard/manage-faqs",
    },
    {
      id: 7,
      path: "/dashboard/manage-feedbacks",
      icon: <AiOutlineComment className="text-sm md:text-xl" />,
      label: "Manage Feedbacks",
      isActive: location === "/dashboard/manage-feedbacks",
    },
  ];

  const superAdminDashboardSidebarLinks = [
    {
      id: 1,
      path: "/dashboard",
      icon: <RxAvatar className="text-sm md:text-xl" />,
      label: "Profile",
      isActive: location === "/dashboard",
    },
    {
      id: 2,
      path: "/dashboard/add-new-admin",
      icon: <AiFillFileAdd className="text-sm md:text-xl" />,
      label: "Add Admin",
      isActive: location === "/dashboard/add-new-admin",
    },
    {
      id: 3,
      path: "/dashboard/manage-admins",
      icon: <FaAddressBook className="text-sm md:text-xl" />,
      label: "Manage Admins",
      isActive: location === "/dashboard/manage-admins",
    },
  ];

  const userDashboardSidebarLinks = [
    {
      id: 1,
      path: "/dashboard",
      icon: <RxAvatar className="text-sm md:text-xl" />,
      label: "Profile",
      isActive: location === "/dashboard",
    },
    {
      id: 2,
      path: "/my-orders",
      icon: <AiFillTrophy className="text-sm md:text-xl" />,
      label: "My Bookings",
      isActive: location === "/my-orders",
    },
  ];
  if (userRole === "admin") {
    return adminDashboardSidebarLinks;
  } else if (userRole === "super_admin") {
    return superAdminDashboardSidebarLinks;
  } else if (userRole === "user") {
    return userDashboardSidebarLinks;
  }
};
