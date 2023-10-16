/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Link, useParams } from "react-router-dom";
import {
  useGetMyCartQuery,
  useRemoveFromCartMutation,
} from "../redux/features/cart/cartApi";
import LoadingSpinner from "../components/Loader/LoadingSpinner";
import ErrorElement from "../components/shared/ErrorElement";
import NoContantFound from "../components/shared/NoContantFound";
import { ICart } from "../interface";
import { FaBookmark, FaTrash } from "react-icons/fa";
import { deleteConfirmationModal } from "../utils/deleteConfirmationModal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PaginationButton from "../components/pagination/PaginationButton";

const MyCartPage = () => {
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const { profileId } = useParams();
  const {
    data: myCart,
    isLoading,
    isError,
  } = useGetMyCartQuery({
    profileId,
    page,
    limit: 10,
    sortBy: "createdAt",
    sortOrder,
  });
  const [removeFromCart, removeState] = useRemoveFromCartMutation();

  const isPreviousButtonDisabled = page === 1;
  const isNextButtonDisabled = page === myCart?.data?.meta?.pageCount;

  const handleRemoveFromCart = (itemId: string) => {
    deleteConfirmationModal(
      "Are you sure?",
      "You wont be able to revert this",
      () => removeFromCart(itemId)
    );
  };

  useEffect(() => {
    if (removeState.isError) {
      toast.error(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (removeState.error as any)?.data?.message || "An error occured"
      );
    }
    if (removeState.isSuccess) {
      toast.success("Removed from cart");
    }
  }, [removeState]);

  let content;
  if (isLoading) {
    return <LoadingSpinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load cart." />;
  } else if (!isLoading && !isError && myCart?.data?.data?.length === 0) {
    content = <NoContantFound message="Cart is empty" />;
  } else if (!isLoading && !isError && myCart?.data?.data?.length > 0) {
    content = (
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Title</th>
              <th>cost</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myCart?.data?.data?.map((item: ICart) => (
              <tr key={item.id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.service.image}
                          alt={item.service.category}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.service.title}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="badge badge-info">
                    {item.service.cost} bdt
                  </div>
                </td>
                <td>
                  <div className="badge badge-outline">
                    {item.service.category}
                  </div>
                </td>
                <td className="flex gap-2 items-center">
                  <button className="tooltip" data-tip="Place Order">
                    <Link to={`/confirm-booking/${item.id}`}>
                      <FaBookmark size={20} />
                    </Link>
                  </button>

                  <button onClick={() => handleRemoveFromCart(item.id)}>
                    <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <div className="py-3 px-2">
        <h1 className="text-center text-4xl my-3">My Cart</h1>
        <p className="text-center">
          Total service in cart: {myCart?.data?.data?.total}
        </p>
        <button className="btn btn-sm">
          <Link to={"/my-orders"}>My Bookings</Link>
        </button>
      </div>
      <div>
        {/* sort bookings - createdAt*/}
        <select
          className="select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option defaultValue={sortOrder} value={"asc"}>
            Added First
          </option>
          <option value={"desc"}>Added Last</option>
        </select>
      </div>
      <div className="px-2">{content}</div>
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

export default MyCartPage;
