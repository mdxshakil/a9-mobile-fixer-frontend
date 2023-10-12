import React, { FormEvent, useState } from "react";
import { FaTrash } from "react-icons/fa";
import LoadingSpinner from "../../components/Loader/LoadingSpinner";
import ErrorElement from "../../components/shared/ErrorElement";
import NoContantFound from "../../components/shared/NoContantFound";
import { IProfile } from "../../interface";
import { useGetUsersQuery } from "../../redux/features/profile/profileApi";
import { USER_ROLE, roleButtons } from "../../constants";
import PaginationButton from "../../components/pagination/PaginationButton";

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

  const handleSortByAndSortOrder = (e: FormEvent<HTMLSelectElement>) => {
    setSortBy("createdAt");
    setSortOrder(e.currentTarget.value);
  };

  const isPreviousButtonDisabled = page === 1;
  const isNextButtonDisabled = page === profiles?.data?.meta?.pageCount;

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
                      <button className="text-error cursor-pointer">
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
      <div className="my-3">
        {/* filter users */}
        <select
          className="select select-bordered w-full max-w-xs"
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
      <div className="overflow-x-auto"></div>
      {content}
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
