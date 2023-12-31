/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import BackToHome from "../components/shared/BackToHome";
import { useSignupMutation } from "../redux/features/auth/authApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { USER_ROLE } from "../constants";
import SignupForm from "../components/shared/SignupForm";

function SignupPage() {
  const navigate = useNavigate();
  const [signUp, { isLoading, isError, isSuccess, error }] =
    useSignupMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Signup successful. Login to your account.");
      navigate("/login");
    }
    if (isError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error as any)?.data?.message || "An error occured");
    }
  }, [isError, isSuccess, error, navigate]);

  return (
    <div className="min-h-screen p-12">
      <h1 className="text-2xl font-bold text-center">Create a new account</h1>
      <div className="flex flex-col items-center justify-center">
        <SignupForm
          role={USER_ROLE.user}
          isLoading={isLoading}
          isSuccess={isSuccess}
          signup={signUp}
        />
        <div className="mt-6">
          <BackToHome />
        </div>
        <Link to="/login">
          <p className="p-3 text-sm">Already have an account?</p>
        </Link>
      </div>
    </div>
  );
}

export default SignupPage;
