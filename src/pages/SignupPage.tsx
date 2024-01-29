/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSignupMutation } from "../redux/features/auth/authApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { USER_ROLE } from "../constants";
import SignupForm from "../components/shared/SignupForm";
import { useNavigate } from "react-router-dom";

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
    <div className="px-3 py-6 md:py-12">
      <h1 className="text-2xl font-bold text-center">Create a new account</h1>
      <div className="flex flex-col items-center justify-center">
        <SignupForm
          role={USER_ROLE.user}
          isLoading={isLoading}
          isSuccess={isSuccess}
          signup={signUp}
        />
      </div>
    </div>
  );
}

export default SignupPage;
