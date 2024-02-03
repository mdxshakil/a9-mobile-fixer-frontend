/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import useGetUserFromStore from "../hooks/useGetUser";
import { IRating, IService } from "../interface";
import {
  useAddToCartMutation,
  useIsAlreadyInCartQuery,
} from "../redux/features/cart/cartApi";
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
  const { data } = useIsAlreadyInCartQuery({ serviceId: id, profileId });

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
    <div className="relative w-full rounded-lg overflow-hidden hover:scale-105 transition-all shadow-sm shadow-primary/50">
      <div className="flex justify-between h-full flex-col gap-2">
        {/* header start */}
        <div>
          <img
            className="h-24 md:h-32 w-full rounded-t-lg object-cover"
            src={image}
            alt="product image"
          />
          {status === "upcoming" && (
            <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-primary text-center text-sm text-accent font-bold">
              {status}
            </span>
          )}
          <div className="mt-2 pb-2 px-3">
            <h2 className="hover:underline hover:text-primary text-xs  md:text-xl font-semibold tracking-tight text-accent h-8 md:h-14 overflow-hidden">
              {status !== "upcoming" ? (
                <Link to={`/service/${id}`}>{title}</Link>
              ) : (
                <span>{title}</span>
              )}
            </h2>
            <div className="mt-2.5 mb-0 md:mb-5 flex items-center justify-between gap-2">
              <div className="flex items-start md:items-center md:flex-row flex-col">
                <span className="mr-2 rounded bg-yellow-400 px-1 md:px-2.5 text-xs font-semibold">
                  {rating || 0}.0
                </span>
                <div className="flex">
                  {Array.from({ length: rating }).map((_rating, i) => (
                    <FaStar
                      size={15}
                      key={i}
                      className="text-yellow-400 md:text-lg text-[10px]"
                    />
                  ))}
                </div>
              </div>
              <p className="badge badge-outline badge-primary md:badge-md badge-xs text-[10px] md:text-[14px] md:py-0 py-2">
                {category}
              </p>
            </div>
          </div>
        </div>
        {/* header end */}
        {/* footer */}
        <div className="flex items-center justify-between p-3">
          <p className="text-xs md:text-2xl font-bold text-accent">
            &#2547;{cost}
          </p>
          {(!role || role === "user") && status !== "upcoming" && (
            <button
              className="btn btn-ghost text-primary flex items-center gap-1 rounded-md hover:bg-transparent hover:text-accent p-0 disabled:bg-transparent btn-xs text-[10px] md:text-sm"
              onClick={handleAddToCart}
              disabled={isLoading || data?.data?.isAlreadyInCart}
            >
              <BsCart2 />
              {data?.data?.isAlreadyInCart ? "Added in cart" : "Add to cart"}
            </button>
          )}
        </div>
        {/* footer end */}
      </div>
    </div>
  );
};

export default ServiceCard;
