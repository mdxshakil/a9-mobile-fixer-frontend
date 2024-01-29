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
import SectionTitle from "../components/SectionTitle";
import moment from "moment";

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

  if (cartItemLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="p-3">
      <div className="w-full md:w-1/2 mx-auto rounded-lg">
        <SectionTitle
          title="Confirm Your Booking for"
          subTitle={cartItem?.data?.service?.title}
          titleClasses="text-lg"
          subTitleClasses="text-primary font-bold mt-1 md:mt-3 text-sm md:text-lg"
        />
        <div>
          <img
            src={cartItem?.data?.service?.image}
            alt={cartItem?.data?.service?.title}
            className="rounded-lg w-full object-cover aspect-video h-28 md:h-52"
          />
        </div>

        <div className="flex items-center w-full mt-3">
          <div className="w-full">
            <div className="flex items-center gap-2 justify-center">
              <div className="stats shadow text-center">
                <div className="stat p-1 md:p-4">
                  <div className="stat-title text-xs md:text-base text-accent/60">
                    Available slots per day
                  </div>
                  <div className="stat-value text-xl md:text-4xl text-primary">
                    0{cartItem?.data?.service?.slotsPerDay}
                  </div>
                </div>
              </div>
              {bookingTime && (
                <div className="stats shadow text-center">
                  <div className="stat p-1 md:p-4">
                    <div className="stat-title text-xs md:text-base text-accent/60">
                      Available on {moment(bookingTime).format("MMM D")}
                    </div>
                    <div
                      className={`stat-value text-xl md:text-4xl ${
                        isError ? "text-error" : "text-primary"
                      }`}
                    >
                      0{!isError ? slotData?.data?.slotsLeft : 0}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-2">
              <div className="mb-4">
                <label className="block text-primary font-semibold mb-2">
                  Select Booking Date and Time:
                </label>
                <input
                  type="date"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="border border-gray-300 p-2 rounded-md w-full focus:outline-primary"
                  min={today.toISOString().split("T")[0]}
                  max={maxDate.toISOString().split("T")[0]}
                />
                {!bookingTime && (
                  <p className="text-sm text-error">
                    *Select a date to continue
                  </p>
                )}
                {isError && (
                  <p className="text-xs md:text-sm text-error">
                    *Please choose a different date
                  </p>
                )}
              </div>
              <p className="text-accent/60 mb-2 text-sm md:text-base">
                This is your last step. Once you confirm, your booking will be
                scheduled.
              </p>
              <button
                className="btn btn-primary btn-sm md:btn-md w-full text-white"
                onClick={handleBooking}
                disabled={
                  !bookingTime || isError || isLoading || confirmState.isLoading
                }
              >
                {isLoading || confirmState.isLoading
                  ? "Please wait"
                  : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBookingPage;
