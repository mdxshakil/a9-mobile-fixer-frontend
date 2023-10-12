export const USER_ROLE = {
  admin: "admin",
  super_admin: "super_admin",
  user: "user",
};

export const roleButtons = [
  {
    role: USER_ROLE.user,
    buttonText: "Make user",
    buttonStyle: "btn-primary",
  },
  {
    role: USER_ROLE.admin,
    buttonText: "Make admin",
    buttonStyle: "btn-accent",
  },
  {
    role: USER_ROLE.super_admin,
    buttonText: "Make super admin",
    buttonStyle: "btn-error",
  },
];