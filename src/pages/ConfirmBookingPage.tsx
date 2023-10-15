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
  const { profileId } = useGetUserFromStore();
  const [bookingTime, setBookingTime] = useState("");
  const { cartItemId } = useParams();
  const { data: cartItem, isLoading: cartItemLoading } =
    useGetCartItemQuery(cartItemId);
  const { data: slotData, isLoading } = useCheckRemainingSlotsQuery({
    serviceId: cartItem?.data?.serviceId,
    bookingTime,
  });
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
  }, [confirmState, navigate]);

  if (isLoading || cartItemLoading || confirmState.isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
        Confirm Your Booking for
      </h1>
      <h1 className="text-xl font-semibold mb-4 text-center text-primary">
        {cartItem?.data?.service?.title}
      </h1>

      <div className="flex items-center justify-center">
        <div>
          <p className="mb-4 font-bold text-info">
            Slots per day: {cartItem?.data?.service?.slotsPerDay}
          </p>
          {bookingTime && (
            <p className="text-info mb-4 font-bold">
              Slots left on {bookingTime}: {slotData?.data?.slotsLeft}
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
            className="btn btn-primary btn-sm md:btn-md"
            onClick={handleBooking}
            disabled={!bookingTime || slotData?.data?.slotsLeft === 0}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBookingPage;
