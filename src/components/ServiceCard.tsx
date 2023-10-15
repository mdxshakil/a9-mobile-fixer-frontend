import { Link, useNavigate } from "react-router-dom";
import useGetUserFromStore from "../hooks/useGetUser";
import { IService } from "../interface";
import { useAddToCartMutation } from "../redux/features/cart/cartApi";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ServiceCard = ({ service }: { service: IService }) => {
  const { id, title, image, cost, category, status, slotsPerDay } =
    service || {};
  const { role, profileId } = useGetUserFromStore();
  const navigate = useNavigate();
  const [addToCart, { isLoading, isError, isSuccess, error }] =
    useAddToCartMutation();

  const handleAddToCart = () => {
    if (!profileId) {
      navigate("/login");
      return;
    }
    addToCart({ profileId, serviceId: id });
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
    <div className="card border bg-base-100 shadow-xl">
      <figure>
        <img
          src={image}
          alt="Shoes"
          className="w-96 h-56 object-cover p-2 rounded-2xl"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title hover:underline">
          <Link to={`/service/${id}`}>{title}</Link>
        </h2>
        <div className="badge badge-primary badge-outline">{category}</div>
        <div>
          <p className="text-start mt-3">
            <span className="mr-1">{cost}</span>
            <span>bdt</span>
          </p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-start">Slots per day: {slotsPerDay}</p>
          {(!role || role === "user") && status !== "upcoming" && (
            <button
              className={`btn btn-primary btn-sm rounded-full ${
                isLoading ? "loading-ball" : ""
              }`}
              onClick={handleAddToCart}
              disabled={isLoading}
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
