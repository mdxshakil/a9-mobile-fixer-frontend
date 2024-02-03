/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../assets/login-image.png";
import CredentialButton from "../components/CredentialButton";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { Slide } from "react-awesome-reveal";
import { FaArrowLeft } from "react-icons/fa";

type RoleCredentials = {
  [key: string]: { email: string; password: string };
};

const roleCredentials: RoleCredentials = {
  user: { email: "shakil@gmail.com", password: "Qw1111" },
  admin: { email: "admin@gmail.com", password: "Qw1111" },
  superAdmin: { email: "superadmin@gmail.com", password: "Qw1111" },
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState("");
  const [defaultValues, setDefaultValues] = useState({
    email: "",
    password: "",
  });
  const [login, loginState] = useLoginMutation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

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

  //set active role and default values
  const handleCredentiaClick = (role: string) => {
    const credentials = roleCredentials[role];
    setDefaultValues({
      ...defaultValues,
      ...credentials,
    });
    setActiveRole(role);
  };

  //re-render when defaultValues changer so that input fields a re populated with default values
  useEffect(() => {
    setValue("email", defaultValues.email);
    setValue("password", defaultValues.password);
  }, [defaultValues, setValue]);

  return (
    <>
      <section className="flex items-center justify-center min-h-screen">
        <div className="container h-full px-6">
          <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
            {/* Left column  */}
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <Slide direction="left">
                <img src={LoginImage} className="w-full" alt="Login image" />
              </Slide>
            </div>

            {/*  Right column */}
            <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
              <Slide direction="right">
                <div className="mb-6">
                  <h2 className="text-accent font-bold text-lg md:text-4xl">
                    Sign in to unlock the best of{" "}
                    <span className="text-primary">iRepair</span>
                  </h2>
                </div>
                <form onSubmit={handleSubmit(handleLogin)}>
                  {/* <!-- Email input --> */}
                  <div className="mb-6" data-te-input-wrapper-init>
                    <label className="">Email address</label>
                    <input
                      type="email"
                      className="block min-h-[auto] w-full border rounded-lg bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none"
                      {...register("email", {
                        required: "Email is required",
                      })}
                    />
                    {errors.email && (
                      <p className="text-xs ml-3 text-red-500 ">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* <!-- Password input --> */}
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <label className="">Password</label>
                    <input
                      type="password"
                      className="block min-h-[auto] w-full bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none border rounded-lg"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    {errors.password && (
                      <p className="text-xs ml-3 text-red-500 ">
                        {errors.password.message}
                      </p>
                    )}
                    <div className="mt-2">
                      <Link to="/signup">
                        <p className="text-accent ml-3 text-sm">
                          Don't have an account?
                        </p>
                      </Link>
                    </div>
                    {/* credentials button */}
                    <div className="mt-3">
                      <CredentialButton
                        onClick={() => handleCredentiaClick("user")}
                        label="User"
                        isActive={activeRole === "user"}
                      />
                      <CredentialButton
                        onClick={() => handleCredentiaClick("admin")}
                        label="Admin"
                        isActive={activeRole === "admin"}
                      />
                      <CredentialButton
                        onClick={() => handleCredentiaClick("superAdmin")}
                        label="Super Admin"
                        isActive={activeRole === "superAdmin"}
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="inline-block btn w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-accent transition duration-150 ease-in-out"
                  >
                    {loginState.isLoading ? "Please wait..." : "Sign in"}
                  </button>
                  <Link to="/">
                    <p className="text-primary mr-3 mt-3 text-sm font-bold flex items-center gap-1">
                      <FaArrowLeft />
                      Go Home
                    </p>
                  </Link>
                </form>
              </Slide>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
