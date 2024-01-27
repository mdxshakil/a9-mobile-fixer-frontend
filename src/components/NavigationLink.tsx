import { NavLink } from "react-router-dom";
type IProps = {
  link: {
    path: string;
    label: string;
  };
};

const NavigationLink = ({ link }: IProps) => {
  return (
    <p className="hover:border-b-2 border-primary text-accent">
      <NavLink
        className={({ isActive }) =>
          isActive ? "border-b-2 border-primary font-bold" : ""
        }
        to={link.path}
      >
        {link.label}
      </NavLink>
    </p>
  );
};

export default NavigationLink;
