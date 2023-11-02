import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/Loader/LoadingSpinner";
import useGetUserFromStore from "../../../hooks/useGetUser";
import { useGetProfileQuery } from "../../../redux/features/profile/profileApi";
import { AiFillEdit } from "react-icons/ai";

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
    <div className="py-12 px-6 grid place-items-center shadow-lg rounded-lg min-h-[90vh] bg-base-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 place-items-center w-full md:w-1/2 p-6">
        <div>
          <img
            src={profilePicture}
            alt={firstName}
            className="rounded-full object-cover w-36 md:w-52 h-36 md:h-52 ring-4 ring-primary"
          />
        </div>
        <div className="grid place-items-center md:place-items-start">
          <div className="flex gap-12 mb-6">
            <div>
              <p>First Name:</p>
              <p className="font-bold">{firstName}</p>
            </div>
            <div>
              <p>Last Name:</p>
              <p className="font-bold">{lastName}</p>
            </div>
          </div>
          <div className="flex gap-12">
            <div>
              <p>Email:</p>
              <p className="font-bold">{email}</p>
            </div>
            <div>
              <p>ContactNo:</p>
              <p className="font-bold">{contactNo}</p>
            </div>
          </div>
          <Link to={"/dashboard/edit-profile"}>
            <button className="btn btn-sm btn-primary my-2">
              Edit Profile <AiFillEdit />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
