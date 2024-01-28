/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import useGetUserFromStore from "../hooks/useGetUser";
import { IRating, IService } from "../interface";
import { useAddToCartMutation } from "../redux/features/cart/cartApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { calculateAvgRating } from "../utils/calculateAvgRating";

const ServiceCard = ({ service }: { service: IService }) => {
  const { id, title, image, cost, category, status, ratings } = service || {};
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
      toast.success("Service added to cart");
    }
  }, [isError, isSuccess, error]);

  const rating = calculateAvgRating(ratings as [IRating]);

  return (
    <div className="relative w-full rounded-lg overflow-hidden">
      <div className="flex justify-between h-full flex-col gap-2">
        {/* header start */}
        <div>
          <img
            className="h-32 w-full rounded-t-lg object-cover"
            src={image}
            alt="product image"
          />
          {status === "upcoming" && (
            <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-primary text-center text-sm text-accent font-bold">
              {status}
            </span>
          )}
          <div className="mt-2 pb-2 px-3">
            <h2 className="card-title hover:underline hover:text-primary text-xl font-semibold tracking-tight text-accent">
              {status !== "upcoming" ? (
                <Link to={`/service/${id}`}>{title}</Link>
              ) : (
                <span>{title}</span>
              )}
            </h2>
            <div className="mt-2.5 mb-5 flex items-center justify-between">
              <div className="flex">
                <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                  {rating || 0}.0
                </span>
                {Array.from({ length: rating }).map((_rating, i) => (
                  <FaStar key={i} className="text-yellow-300" />
                ))}
              </div>
              <p className="badge badge-outline badge-primary">{category}</p>
            </div>
          </div>
        </div>
        {/* header end */}
        {/* footer */}
        <div className="flex items-center justify-between px-3">
          <p className="text-2xl font-bold text-accent">&#2547;{cost}</p>
          {(!role || role === "user") && status !== "upcoming" && (
            <button
              className="btn btn-ghost text-primary flex items-center gap-1 rounded-md hover:bg-transparent hover:text-accent disabled:bg-transparent"
              onClick={handleAddToCart}
              disabled={isLoading}
            >
              <BsCart2 />
              Add to cart
            </button>
          )}
        </div>
        {/* footer end */}
      </div>
    </div>
  );
};

export default ServiceCard;
