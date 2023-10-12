/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import BackToHome from "../components/shared/BackToHome";
import { useLoginMutation } from "../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [login, loginState] = useLoginMutation();

  const handleLogin = async (data: FieldValues) => {
    await login(data);
  };

  useEffect(() => {
    if (loginState.isSuccess) {
      toast.success("Welcome back!");
      navigate("/");
    }
    if (loginState.isError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error(
        (loginState.error as any)?.data?.message || "An error occured"
      );
    }
  }, [loginState, navigate]);

  return (
    <div className="hero min-h-screen p-12 ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provide your credentials and login to your account to enjoy the full
            features of mobile fix.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", {
                  required: true,
                })}
              />
              {errors.email && (
                <p className="text-[12px] text-red-500 ">
                  This field is required
                </p>
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
                {...register("password", {
                  required: true,
                })}
              />
              {errors.password && (
                <p className="text-[12px] text-red-500 ">
                  This field is required
                </p>
              )}
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                disabled={loginState.isLoading}
              >
                Login
              </button>
            </div>
          </form>
          <BackToHome />
          <Link to="/signup">
            <p className="p-3 text-sm text-center">Don't have an account?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
