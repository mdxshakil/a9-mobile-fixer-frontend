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

export type IBlog = {
  id: string;
  title: string;
  description: string;
  profileId: string;
  profile: IProfile;
  createdAt: Date;
  updatedAt: Date;
};

export type IFaq = {
  id: string;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IService = {
  id: string;
  title: string;
  description: string;
  image: string;
  cost: number;
  slotsPerDay: number;
  status: "live" | "upcoming";
  reviews?: IReview;
  ratings?: IRating;
  createdAt: Date;
  updatedAt: Date;
  category: string;
};

export type IReview = {
  id: string;
  comment: string;
  serviceId?: string;
  service?: IService;
};
export type IRating = {
  id: string;
  ratingValue: number;
  serviceId?: string;
  service?: IService;
};

export type ICart = {
  id: string;
  profileId: string;
  serviceId: string;
  service: IService;
};
