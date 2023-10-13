import SignupForm from "../../../components/shared/SignupForm";
import { useSignupMutation } from "../../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { USER_ROLE } from "../../../constants";

const AddUserPage = () => {
  const [signUp, { isLoading, isError, isSuccess, error }] =
    useSignupMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("New user added successfully");
    }
    if (isError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error as any)?.data?.message || "An error occured");
    }
  }, [isSuccess, isError, error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-12">
      <h1 className="text-2xl font-bold">Add New User</h1>
      <SignupForm
        role={USER_ROLE.user}
        isLoading={isLoading}
        isSuccess={isSuccess}
        signup={signUp}
      />
    </div>
  );
};

export default AddUserPage;
