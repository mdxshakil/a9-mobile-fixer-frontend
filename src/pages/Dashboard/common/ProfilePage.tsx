import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/Loader/LoadingSpinner";
import useGetUserFromStore from "../../../hooks/useGetUser";
import { useGetProfileQuery } from "../../../redux/features/profile/profileApi";
import { AiFillEdit } from "react-icons/ai";
import greetingTime from "../../../utils/gretting";
import { MdEmail } from "react-icons/md";
import { FaPhoneSquare } from "react-icons/fa";

const ProfilePage = () => {
  const { profileId } = useGetUserFromStore();
  const { data: profile, isLoading } = useGetProfileQuery(profileId);
  const { contactNo, firstName, lastName, profilePicture, user } =
    profile?.data || {};
  const { email } = user || {};

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="py-12 px-6 grid place-items-center rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 place-items-center">
        <div>
          <img
            src={profilePicture}
            alt={firstName}
            className="h-[50vh] object-cover rounded-lg"
          />
        </div>
        <div className="p-3 md:p-0">
          <div>
            <p>Hello,</p>
            <h1 className="sm:text-4xl md:text-6xl font-bold text-accent">
              {firstName + " " + lastName}
            </h1>
            <p className="tracking-widest font-semibold">{greetingTime()}</p>
            <div className="mt-6 grid gap-3">
              <div className="flex items-center">
                <MdEmail />
                <p>Email: {email}</p>
              </div>
              <div className="flex items-center ">
                <FaPhoneSquare />
                <p>Phone: {contactNo}</p>
              </div>
              <Link to={"/dashboard/edit-profile"}>
                <button className="btn btn-sm btn-primary text-accent my-2">
                  Edit Profile <AiFillEdit />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
