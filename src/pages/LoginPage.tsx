/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import BackToHome from "../components/shared/BackToHome";
import { useLoginMutation } from "../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Credentials from "../components/Credentials";
import CredentialButton from "../components/CredentialButton";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showUserCredentials, setShowUserCredentials] = useState(false);
  const [showAdminCredentials, setShowAdminCredentials] = useState(false);
  const [showSuperAdminCredentials, setShowSuperAdminCredentials] =
    useState(false);
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
    <div className="flex items-center justify-center min-h-screen p-12">
      <div className="hero-content gap-6 md:gap-12 flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provide your credentials and login to your account to enjoy the full
            features of mobile fix.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm bg-base-100">
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
                className={`btn btn-primary text-white ${
                  loginState.isLoading ? "loading-ring" : ""
                }`}
                disabled={loginState.isLoading}
              >
                Login
              </button>
            </div>
            <div className="grid gap-y-3">
              <div className="flex gap-3">
                <CredentialButton
                  onClick={() => {
                    setShowUserCredentials(!showUserCredentials);
                    setShowAdminCredentials(false);
                    setShowSuperAdminCredentials(false);
                  }}
                  label="User"
                  isActive={showUserCredentials}
                />
                <CredentialButton
                  onClick={() => {
                    setShowAdminCredentials(!showAdminCredentials);
                    setShowUserCredentials(false);
                    setShowSuperAdminCredentials(false);
                  }}
                  label="Admin"
                  isActive={showAdminCredentials}
                />
                <CredentialButton
                  onClick={() => {
                    setShowSuperAdminCredentials(!showSuperAdminCredentials);
                    setShowUserCredentials(false);
                    setShowAdminCredentials(false);
                  }}
                  label="Super Admin"
                  isActive={showSuperAdminCredentials}
                />
              </div>
              {showUserCredentials && (
                <div className="flex flex-col gap-y-2">
                  <Credentials email="shakil@gmail.com" password="Qw1111" />
                </div>
              )}
              {showAdminCredentials && (
                <Credentials email="admin@gmail.com" password="Qw1111" />
              )}
              {showSuperAdminCredentials && (
                <Credentials email="superadmin@gmail.com" password="Qw1111" />
              )}
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
