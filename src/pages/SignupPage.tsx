import { useForm, FieldValues } from "react-hook-form";
import { Link } from "react-router-dom";
import BackToHome from "../components/shared/BackToHome";

function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

    console.log(signupData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-12">
      <h1 className="text-2xl font-bold">Signup</h1>
      <form className="card-body" onSubmit={handleSubmit(handleSignup)}>
        <div className="flex gap-3">
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            required
            {...register("firstName", {
              required: true,
            })}
          />
          {errors.password && (
            <p className="text-[12px] text-red-500 ">This field is required</p>
          )}
        </div>
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
              required: true,
            })}
          />
          {errors.firstName && (
            <p className="text-[12px] text-red-500 ">This field is required</p>
          )}
        </div>
        <div>
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

        <div className="form-control mt-6">
          <button className="btn btn-primary">SignUp</button>
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
