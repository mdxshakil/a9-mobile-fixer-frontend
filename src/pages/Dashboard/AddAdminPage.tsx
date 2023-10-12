import { useSignupMutation } from "../../redux/features/auth/authApi";
import SignupForm from "../../components/shared/SignupForm";
import { USER_ROLE } from "../../constants";
import toast from "react-hot-toast";
import { useEffect } from "react";

const AddAdminPage = () => {
  const [signUp, { isLoading, isError, isSuccess, error }] =
    useSignupMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("New admin added successfully");
    }
    if (isError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error as any)?.data?.message || "An error occured");
    }
  }, [isSuccess, isError, error]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-12">
      <h1 className="text-2xl font-bold">Add New Admin</h1>
      <SignupForm
        role={USER_ROLE.admin}
        isLoading={isLoading}
        isSuccess={isSuccess}
        signup={signUp}
      />
    </div>
  );
};

export default AddAdminPage;
