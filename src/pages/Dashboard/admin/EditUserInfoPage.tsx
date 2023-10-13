/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditProfileMutation,
  useGetProfileQuery,
} from "../../../redux/features/profile/profileApi";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/Loader/LoadingSpinner";
import toast from "react-hot-toast";

const EditUserInfoPage = () => {
  const navigate = useNavigate();
  const { profileId } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const { data: profile, isLoading } = useGetProfileQuery(profileId);
  const [editProfile, editProfileState] = useEditProfileMutation();
  //   @ts-ignore
  const [defaultValues, setDefaultValues] = useState({
    firstName: "",
    lastName: "",
    contactNo: "",
    profilePicture: "",
  });

  //set default values to the state
  useEffect(() => {
    if (profile) {
      const { firstName, lastName, contactNo, profilePicture } =
        profile.data || {};

      // Set default values in the state
      setDefaultValues({
        firstName,
        lastName,
        contactNo,
        profilePicture,
      });

      // Set default values for the input fields
      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("contactNo", contactNo);
    }
  }, [profile, setValue]);

  const handleEditProfile = async (data: FieldValues) => {
    let payload;

    //if profile picture is being changed
    if (data?.profilePicture[0]) {
      const formData = new FormData();
      formData.append("file", data.profilePicture[0]);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
      const res = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
        method: "post",
        body: formData,
      });
      const result = await res.json();
      payload = { ...data, profilePicture: result.url };
    } else {
      payload = { ...data, profilePicture: defaultValues.profilePicture };
    }

    await editProfile({ payload, profileId });
  };

  useEffect(() => {
    if (editProfileState.isSuccess) {
      toast.success("Profile info updated");
      navigate("/dashboard/manage-users");
    }
    if (editProfileState.isError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error(
        (editProfileState.error as any)?.data?.message || "An error occured"
      );
    }
  }, [editProfileState, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-12">
      <h1 className="text-2xl font-bold">Edit User's Profile info</h1>
      <form className="card-body" onSubmit={handleSubmit(handleEditProfile)}>
        <div className="flex gap-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              placeholder="FirstName"
              className="input input-bordered"
              {...register("firstName")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="LastName"
              className="input input-bordered"
              {...register("lastName")}
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Contact No</span>
          </label>
          <input
            type="text"
            placeholder="ContactNo"
            className="input input-bordered"
            {...register("contactNo")}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Profile Picture</span>
          </label>
          <input
            type="file"
            className="file-input input-primary file-input-bordered file-input-sm w-full"
            {...register("profilePicture")}
            accept="image/*"
          />
        </div>

        <div className="form-control mt-6">
          <button
            className={`btn btn-primary `}
            disabled={editProfileState.isLoading}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserInfoPage;
