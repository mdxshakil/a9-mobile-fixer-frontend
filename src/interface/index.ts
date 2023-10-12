export type ISingupUser = {
  email: string;
  password: string;
  role: "admin" | "super_admin" | "user";
  firstName: string;
  lastName: string;
  profilePicture: string;
  contactNo: string;
};

export type IUser = {
  id: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IProfile = {
  id: string;
  firstName: string;
  lastName: string;
  contactNo: string;
  profilePicture: string;
  userId: string;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
};
