import { useNavigate, useParams } from "react-router-dom";
import { useGetCartItemQuery } from "../redux/features/cart/cartApi";
import {
  useCheckRemainingSlotsQuery,
  useConfirmBookingMutation,
} from "../redux/features/booking/bookingApi";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/Loader/LoadingSpinner";
import useGetUserFromStore from "../hooks/useGetUser";
import toast from "react-hot-toast";

const ConfirmBookingPage = () => {
  const navigate = useNavigate();
  const { profileId, role } = useGetUserFromStore();
  const [bookingTime, setBookingTime] = useState("");
  const { cartItemId } = useParams();
  //get the cart item data to dispaly on confirm booking page
  const { data: cartItem, isLoading: cartItemLoading } =
    useGetCartItemQuery(cartItemId);
  //check remaining slots on the user selected day for that service
  const {
    data: slotData,
    isLoading,
    isError,
  } = useCheckRemainingSlotsQuery(
    {
      serviceId: cartItem?.data?.service?.id,
      bookingTime,
    },
    { skip: !bookingTime }
  );
  const [confirmBooking, confirmState] = useConfirmBookingMutation();

  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 7);

  const handleBooking = () => {
    confirmBooking({
      profileId,
      serviceId: cartItem?.data?.serviceId,
      bookingTime,
      cartItemId,
    });
  };

  useEffect(() => {
    if (confirmState.isError) {
      toast.error(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (confirmState.error as any)?.data?.message || "An error occured"
      );
    }
    if (confirmState.isSuccess) {
      toast.success("Booking confirmed");
      navigate("/my-orders");
    }
    if (isError) {
      toast.error(`No slots left on ${bookingTime}`);
    }
  }, [confirmState, navigate, role, isError, bookingTime]);

  if (isLoading || cartItemLoading || confirmState.isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="p-6">
      <div className="bg-base-200 w-full md:w-1/2 mx-auto py-3 rounded-lg shadow-xl">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
          Confirm Your Booking for
        </h1>
        <h1 className="text-xl font-semibold mb-4 text-center">
          {cartItem?.data?.service?.title}
        </h1>
        <div>
          <img
            src={cartItem?.data?.service?.image}
            alt={cartItem?.data?.service?.title}
            className="h-52 px-3 rounded-lg w-full object-cover mx-auto my-2"
          />
        </div>

        <div className="flex items-center justify-center mt-3">
          <div>
            <p className="mb-4 font-bold ">
              Slots per day: {cartItem?.data?.service?.slotsPerDay}
            </p>
            {bookingTime && (
              <p className={`mb-4 font-bold  ${isError ? "badge-error" : ""}`}>
                Slots left on {bookingTime}:{" "}
                {!isError ? slotData?.data?.slotsLeft : 0}
              </p>
            )}
            <p className="text-gray-600 mb-6">
              This is your last step. Once you confirm, your booking will be
              scheduled.
            </p>
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">
                Select Booking Date and Time:
              </label>
              <input
                type="date"
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full focus:ring focus:ring-indigo-300 focus:outline-none"
                min={today.toISOString().split("T")[0]}
                max={maxDate.toISOString().split("T")[0]}
              />
              {!bookingTime && (
                <p className="text-sm text-error">*Select a date to continue</p>
              )}
            </div>
            <button
              className="btn btn-primary btn-sm md:btn-md w-full text-white"
              onClick={handleBooking}
              disabled={!bookingTime || isError}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBookingPage;
