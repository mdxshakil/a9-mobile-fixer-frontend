/* eslint-disable @typescript-eslint/no-explicit-any */
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
      toast.error((error as any)?.data?.message || "An error occured");
    }
    if (isSuccess) {
      toast.success("Successfully added to cart");
    }
  }, [isError, isSuccess, error]);

  return (
    <div className="card border bg-base-100 hover:scale-105 transition-all hover:bg-base-200">
      <figure>
        <img
          src={image}
          alt="Shoes"
          className="w-96 h-56 object-cover p-2 rounded-2xl"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title hover:underline">
          {status !== "upcoming" ? (
            <Link to={`/service/${id}`}>{title}</Link>
          ) : (
            <span>{title}</span>
          )}
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
              className={`btn btn-primary btn-xs md:btn-sm rounded-full text-white ${
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
