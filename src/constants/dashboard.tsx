import {
  AiFillBook,
  AiFillTrophy,
  AiOutlineHistory,
  AiOutlineUser,
} from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import { BiSolidDashboard } from "react-icons/bi";
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
      path: "/dashboard/statistics",
      icon: <BiSolidDashboard className="text-sm md:text-xl" />,
      label: "Statistics",
      isActive: location === "/dashboard/statistics",
    },
    {
      id: 3,
      path: "/dashboard/manage-blogs",
      icon: <AiFillBook className="text-sm md:text-xl" />,
      label: "Manage Blogs",
      isActive: location === "/dashboard/manage-blogs",
    },
    {
      id: 4,
      path: "/dashboard/manage-users",
      icon: <AiOutlineUser className="text-sm md:text-xl" />,
      label: "Manage Users",
      isActive: location === "/dashboard/manage-users",
    },
    {
      id: 5,
      path: "/dashboard/manage-categories",
      icon: <BiSolidCategory className="text-sm md:text-xl" />,
      label: "Manage Users",
      isActive: location === "/dashboard/manage-categories",
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
      icon: <AiFillBook className="text-sm md:text-xl" />,
      label: "Add Admin",
      isActive: location === "/dashboard/add-new-admin",
    },
    {
      id: 3,
      path: "/dashboard/manage-admins",
      icon: <AiFillTrophy className="text-sm md:text-xl" />,
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
      path: "/dashboard/achivements",
      icon: <AiFillTrophy className="text-sm md:text-xl" />,
      label: "Achivements",
      isActive: location === "/dashboard/achivements",
    },
    {
      id: 3,
      path: "/dashboard/reading-history",
      icon: <AiOutlineHistory className="text-sm md:text-xl" />,
      label: "Reading History",
      isActive: location === "/dashboard/reading-history",
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
