import { useNavigate } from "react-router-dom";
import {
  useAddToCartMutation,
  useIsAlreadyInCartQuery,
} from "../../redux/features/cart/cartApi";
import { useEffect } from "react";
import toast from "react-hot-toast";

type IProps = {
  profileId: string;
  serviceId: string;
};

const ActionButtons = ({ profileId, serviceId }: IProps) => {
  const navigate = useNavigate();
  const { data } = useIsAlreadyInCartQuery(
    { serviceId, profileId },
    { skip: !profileId }
  );
  const [addToCart, { isLoading, isError, isSuccess, error }] =
    useAddToCartMutation();

  const handleAddToCart = () => {
    if (!profileId) {
      navigate("/login");
      return;
    }
    addToCart({ profileId, serviceId });
  };

  useEffect(() => {
    if (isError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error as any)?.data?.message || "An error occured");
    }
    if (isSuccess) {
      toast.success("Successfully added to cart");
    }
  }, [isError, isSuccess, error]);

  const handleNavigateToBookingPgae = () => {
    if (!profileId) {
      navigate("/login");
    } else {
      navigate(`/confirm-booking/${serviceId}`);
    }
  };

  return (
    <div>
      <button
        className={`btn btn-primary btn-xs md:btn-sm rounded-l-full border border-white border-r-2 font-bold text-accent ${
          data?.data?.isAlreadyInCart ? "italic" : ""
        }`}
        disabled={isLoading || data?.data?.isAlreadyInCart}
        onClick={handleAddToCart}
      >
        {isLoading
          ? "Please wait..."
          : data?.data?.isAlreadyInCart
          ? "In Cart"
          : "Add to Cart"}
      </button>
      <button
        className="btn btn-primary btn-xs md:btn-sm rounded-r-full border border-white border-l-2 font-bold text-accent"
        onClick={handleNavigateToBookingPgae}
      >
        Book Now
      </button>
    </div>
  );
};

export default ActionButtons;
