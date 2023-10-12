import { FaEdit } from "react-icons/fa";
import LoadingSpinner from "../../components/Loader/LoadingSpinner";
import useGetUserFromStore from "../../hooks/useGetUser";
import { useGetProfileQuery } from "../../redux/features/profile/profileApi";

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
    <div className="mt-12">
      <div className="flex flex-col items-center justify-center">
        <img src={profilePicture} alt={firstName} className="w-36" />
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            {firstName + " " + lastName}
          </h2>
          <p className="italic">{email}</p>
          <p>Mobile: {contactNo}</p>
        </div>
        <div className="mt-3">
          <button className="btn btn-sm">
            Edit Profile <FaEdit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
