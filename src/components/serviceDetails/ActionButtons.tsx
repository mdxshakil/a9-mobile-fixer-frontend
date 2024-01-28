import { useNavigate } from "react-router-dom";
import { useAddToCartMutation } from "../../redux/features/cart/cartApi";
import { useEffect } from "react";
import toast from "react-hot-toast";

type IProps = {
  profileId: string;
  serviceId: string;
};

const ActionButtons = ({ profileId, serviceId }: IProps) => {
  const navigate = useNavigate();
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

  return (
    <div className="flex -mx-2 mb-4">
      <div className="w-full px-2">
        <button
          className="btn btn-primary btn-sm rounded-full text-accent font-bold"
          disabled={isLoading}
          onClick={handleAddToCart}
        >
          {isLoading ? "Please wait..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
