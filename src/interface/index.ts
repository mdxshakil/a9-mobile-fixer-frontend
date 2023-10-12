export type ISingupUser = {
  email: string;
  password: string;
  role: "admin" | "super_admin" | "user";
  firstName: string;
  lastName: string;
  profilePicture: string;
  contactNo: string;
};
