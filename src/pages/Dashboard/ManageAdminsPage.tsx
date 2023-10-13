import React, { FormEvent, useState } from "react";
import { FaTrash } from "react-icons/fa";
import LoadingSpinner from "../../components/Loader/LoadingSpinner";
import ErrorElement from "../../components/shared/ErrorElement";
import NoContantFound from "../../components/shared/NoContantFound";
import { IProfile } from "../../interface";
import {
  useChangeUserRoleMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../redux/features/profile/profileApi";
import { USER_ROLE, roleButtons } from "../../constants";
import PaginationButton from "../../components/pagination/PaginationButton";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManageAdminsPage = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filter, setFilter] = useState("all");

  const {
    data: profiles,
    isLoading,
    isError,
  } = useGetUsersQuery({ page, sortBy, sortOrder, filter, limit: 10 });
  const [changeRole, changeRoleState] = useChangeUserRoleMutation();
  const [deleteUser, deleteUserState] = useDeleteUserMutation();

  const handleSortByAndSortOrder = (e: FormEvent<HTMLSelectElement>) => {
    setSortBy("createdAt");
    setSortOrder(e.currentTarget.value);
  };

  const handleRoleChange = async (role: string, userId: string) => {
    await changeRole({ newRole: role, userId });
  };

  const handleUserDelete = async (userId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(userId);
      }
    });
  };

  const isPreviousButtonDisabled = page === 1;
  const isNextButtonDisabled = page === profiles?.data?.meta?.pageCount;

  useEffect(() => {
    if (changeRoleState.isSuccess || deleteUserState.isSuccess) {
      toast.success("Action succed!");
    }
    if (changeRoleState.isError || deleteUserState.isError) {
      toast.error("Action failed.Try again");
    }
  }, [changeRoleState, deleteUserState]);

  if (changeRoleState.isLoading || deleteUserState.isLoading) {
    return <LoadingSpinner />;
  }

  let content;
  if (isLoading) {
    return <LoadingSpinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load admins data." />;
  } else if (!isLoading && !isError && profiles?.data?.data?.length === 0) {
    content = <NoContantFound message="No data available" />;
  } else if (!isLoading && !isError && profiles?.data?.data?.length > 0) {
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
          {profiles?.data?.data?.map((profile: IProfile) => {
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
                      <div className="text-sm opacity-50">
                        {profile.firstName + " " + profile.lastName}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{profile.user.email}</td>
                <td>{profile.user.role}</td>
                <th>
                  <div className="flex gap-1">
                    {profile.user.role !== USER_ROLE.super_admin && (
                      <>
                        {roleButtons.map((buttonInfo) => {
                          if (profile.user.role !== buttonInfo.role) {
                            return (
                              <button
                                key={buttonInfo.role}
                                className={`btn btn-xs ${buttonInfo.buttonStyle}`}
                                onClick={() =>
                                  handleRoleChange(
                                    buttonInfo.role,
                                    profile.user.id
                                  )
                                }
                              >
                                {buttonInfo.buttonText}
                              </button>
                            );
                          }
                          return null;
                        })}
                      </>
                    )}
                    {profile.user.role !== USER_ROLE.super_admin && (
                      <button
                        className="text-error cursor-pointer"
                        onClick={() => handleUserDelete(profile?.user?.id)}
                      >
                        <FaTrash size={20} />
                      </button>
                    )}
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
      <div className="my-3 flex justify-center">
        {/* filter users */}
        <select
          className="select"
          onChange={(e) => setFilter(e.currentTarget.value)}
          value={filter}
        >
          <option defaultValue={filter} value={"all"}>
            All Users
          </option>
          <option value={"user"}>Users</option>
          <option value={"admin"}>Admins</option>
          <option value={"super_admin"}>Super Admins</option>
        </select>
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
      <p>Total users: {profiles?.data?.meta?.total}</p>
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

export default ManageAdminsPage;
