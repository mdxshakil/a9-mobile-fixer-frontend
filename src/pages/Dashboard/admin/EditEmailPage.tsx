/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditUserEmailMutation,
  useGetUserByIdQuery,
} from "../../../redux/features/user/userApi";
import { useState, useEffect, FormEvent } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Loader/LoadingSpinner";

export const EditEmailPage = () => {
  const { userId } = useParams();
  const { data: user, isLoading } = useGetUserByIdQuery(userId);
  const [newEmail, setNewEmail] = useState("");
  const [editUserEmail, editEmailStatus] = useEditUserEmailMutation();
  const navigate = useNavigate();

  useEffect(() => {
    setNewEmail(user?.data?.email);
  }, [user?.data?.email]);

  const handleEmailEdit = (e: FormEvent) => {
    e.preventDefault();
    editUserEmail({ userId, newEmail });
  };

  useEffect(() => {
    if (editEmailStatus.isSuccess) {
      toast.success("Email address updated");
      navigate("/dashboard/manage-users");
    }
    if (editEmailStatus.isError) {
      toast.error(
        (editEmailStatus.error as any)?.data?.message || "An error occured"
      );
    }
  }, [editEmailStatus, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-12">
      <h1 className="text-2xl font-bold">Edit User's Email address</h1>
      <form className="card-body" onSubmit={handleEmailEdit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="New Email"
            className="input input-bordered"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <div className="form-control mt-6">
          <button
            className={`btn btn-primary ${
              editEmailStatus.isLoading ? "loading-infinity" : ""
            }`}
            disabled={editEmailStatus.isLoading}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
