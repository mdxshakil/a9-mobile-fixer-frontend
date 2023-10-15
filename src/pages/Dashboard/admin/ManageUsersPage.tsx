import { FormEvent, useState, useEffect } from "react";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../../redux/features/profile/profileApi";
import LoadingSpinner from "../../../components/Loader/LoadingSpinner";
import ErrorElement from "../../../components/shared/ErrorElement";
import NoContantFound from "../../../components/shared/NoContantFound";
import { IProfile } from "../../../interface";
import PaginationButton from "../../../components/pagination/PaginationButton";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { deleteConfirmationModal } from "../../../utils/deleteConfirmationModal";

const ManageUsersPage = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");

  const {
    data: users,
    isLoading,
    isError,
  } = useGetAllUsersQuery({ page, sortBy, sortOrder, limit: 10 });
  const [deleteUser, deleteUserState] = useDeleteUserMutation();

  const isPreviousButtonDisabled = page === 1;
  const isNextButtonDisabled = page === users?.data?.meta?.pageCount;

  const handleSortByAndSortOrder = (e: FormEvent<HTMLSelectElement>) => {
    setSortBy("createdAt");
    setSortOrder(e.currentTarget.value);
  };

  const handleUserDelete = async (userId: string) => {
    deleteConfirmationModal(
      "Are you sure?",
      "You wont be able to revert this",
      () => deleteUser(userId)
    );
  };

  useEffect(() => {
    if (deleteUserState.isSuccess) {
      toast.success("Action succed!");
    }
    if (deleteUserState.isError) {
      toast.error("Action failed.Try again");
    }
  }, [deleteUserState]);

  if (deleteUserState.isLoading) {
    return <LoadingSpinner />;
  }

  let content;
  if (isLoading) {
    return <LoadingSpinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load users data." />;
  } else if (!isLoading && !isError && users?.data?.data?.length === 0) {
    content = <NoContantFound message="No data available" />;
  } else if (!isLoading && !isError && users?.data?.data?.length > 0) {
    content = (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.data?.data?.map((profile: IProfile) => {
            return (
              <tr key={profile.id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={profile.profilePicture}
                          alt={profile.firstName}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {profile.firstName + " " + profile.lastName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="flex items-center gap-2">
                  <span>{profile.user.email}</span>
                  <span className="cursor-pointer">
                    <Link to={`/dashboard/edit-email/${profile.user.id}`}>
                      <FaEdit size={20} />
                    </Link>
                  </span>
                </td>
                <td>{profile.user.role}</td>
                <th>
                  <div className="flex gap-1">
                    <Link to={`/dashboard/edit-user-info/${profile.id}`}>
                      <button className="btn btn-xs btn-ghost btn-info">
                        <FaEdit size={20} />
                      </button>
                    </Link>
                    <button
                      className="btn btn-xs btn-ghost btn-error"
                      onClick={() => handleUserDelete(profile?.user?.id)}
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <div className="py-3">
        <Link to="/dashboard/add-user">
          <button className="btn btn-sm btn-primary ">
            Add New User <FaPlus />
          </button>
        </Link>
      </div>
      <div className="my-3 flex justify-center">
        {/* sort users - createdAt*/}
        <select
          className="select"
          onChange={(e) => handleSortByAndSortOrder(e)}
          value={sortOrder}
        >
          <option defaultValue={sortOrder} value={"asc"}>
            Ascending
          </option>
          <option value={"desc"}>Descending</option>
        </select>
      </div>
      <p>Total users: {users?.data?.meta?.total}</p>
      <div className="overflow-x-auto">{content}</div>
      <div>
        <PaginationButton
          setPage={setPage}
          isPreviousButtonDisabled={isPreviousButtonDisabled}
          isNextButtonDisabled={isNextButtonDisabled}
          currentPage={page}
        />
      </div>
    </div>
  );
};

export default ManageUsersPage;
