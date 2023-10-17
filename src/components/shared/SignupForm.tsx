import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ISingupUser } from "../../interface";
import LoadingSpinner from "../Loader/LoadingSpinner";
import { emailValidationRegex, passwordValidationRegex } from "../../constants";

/* eslint-disable @typescript-eslint/no-explicit-any */
type IProps = {
  role: string;
  isLoading: boolean;
  isSuccess: boolean;
  signup: (data: ISingupUser) => void;
};

function SignupForm({ role, isLoading, isSuccess, signup }: IProps) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();


  const handleSignup = async (data: FieldValues) => {
    const formData = new FormData();
    formData.append("file", data.profilePicture[0]);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    setLoading(true);
    const res = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
      method: "post",
      body: formData,
    });
    const result = await res.json();
    setLoading(false);

    const signupData = {
      ...data,
      profilePicture: result.url,
      role,
    };

    await signup(signupData as ISingupUser);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <form className="card-body" onSubmit={handleSubmit(handleSignup)}>
      <div className="flex gap-3">
        {/* first name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            placeholder="FirstName"
            className="input input-bordered"
            required
            {...register("firstName", {
              required: true,
            })}
          />
          {errors.firstName && (
            <p className="text-[12px] text-red-500 ">This field is required</p>
          )}
        </div>
        {/* last name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            placeholder="LastName"
            className="input input-bordered"
            required
            {...register("lastName", {
              required: true,
            })}
          />
          {errors.lastName && (
            <p className="text-[12px] text-red-500 ">This field is required</p>
          )}
        </div>
      </div>
      {/* contact no */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Contact No</span>
        </label>
        <input
          type="text"
          placeholder="ContactNo"
          className="input input-bordered"
          required
          {...register("contactNo", {
            required: true,
          })}
        />
        {errors.contactNo && (
          <p className="text-[12px] text-red-500 ">This field is required</p>
        )}
      </div>
      {/* email */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="email"
          className="input input-bordered"
          required
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: emailValidationRegex,
              message: "Provide a valid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-[12px] text-red-500 ">
            {errors.email.message as string}
          </p>
        )}
      </div>
      {/* password */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          className="input input-bordered"
          required
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            pattern: {
              value: passwordValidationRegex,
              message:
                " Password must contain at least one uppercase, one lowercase, and be at least 6 characters long.",
            },
          })}
        />
        {errors.password && (
          <p className="text-[12px] text-red-500 ">
            {errors.password.message as string}
          </p>
        )}
      </div>
      {/* confirm password */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Confirm Password</span>
        </label>
        <input
          type="password"
          placeholder="Confirm Password"
          className="input input-bordered"
          required
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "This field is required",
            },
            validate: (val: string) => {
              if (watch("password") != val) {
                return "Password dont match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <p className="text-[12px] text-red-500 ">
            {errors.confirmPassword.message as string}
          </p>
        )}
      </div>
      {/* profile pic */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Profile Picture</span>
        </label>
        <input
          type="file"
          className="file-input input-primary file-input-bordered file-input-sm w-full"
          required
          {...register("profilePicture", {
            required: true,
          })}
          accept="image/*"
        />
        {errors.profilePicture && (
          <p className="text-[12px] text-red-500 ">This field is required</p>
        )}
      </div>
      {/* submit btn */}
      <div className="form-control mt-6">
        <button
          className={`btn btn-primary ${isLoading ? "loading-infinity" : ""}`}
          disabled={isLoading}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
