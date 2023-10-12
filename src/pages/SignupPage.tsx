/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import BackToHome from "../components/shared/BackToHome";
import { useSignupMutation } from "../redux/features/auth/authApi";
import { useEffect } from "react";
import toast from "react-hot-toast";

function SignupPage() {
  const navigate = useNavigate();
  const [signUp, signupState] = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const handleSignup = async (data: FieldValues) => {
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

    const signupData = {
      ...data,
      profilePicture: result.url,
    };

    await signUp(signupData);
  };

  useEffect(() => {
    if (signupState.isSuccess) {
      toast.success("Signup successful. Login to your account.");
      navigate("/login");
    }
    if (signupState.isError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error(
        (signupState.error as any)?.data?.message || "An error occured"
      );
    }
  }, [signupState, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-12">
      <h1 className="text-2xl font-bold">Signup</h1>
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
              <p className="text-[12px] text-red-500 ">
                This field is required
              </p>
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
              <p className="text-[12px] text-red-500 ">
                This field is required
              </p>
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
              required: true,
            })}
          />
          {errors.email && (
            <p className="text-[12px] text-red-500 ">This field is required</p>
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
                value: passwordValidation,
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
            className={`btn btn-primary ${
              signupState.isLoading ? "loading" : ""
            }`}
            disabled={signupState.isLoading}
          >
            SignUp
          </button>
        </div>
      </form>
      <BackToHome />
      <Link to="/login">
        <p className="p-3 text-sm">Already have an account?</p>
      </Link>
    </div>
  );
}

export default SignupPage;
