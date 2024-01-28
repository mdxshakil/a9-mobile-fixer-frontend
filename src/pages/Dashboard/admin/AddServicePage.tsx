import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAddNewServiceMutation } from "../../../redux/features/service/serviceApi";
import toast from "react-hot-toast";
import { serviceCategories } from "../../../constants";
import { uploadImageToCloudinary } from "../../../utils/imageUploader";

export const AddServicePage = () => {
  const [loading, setLoading] = useState(false);
  const [addNewService, { isLoading, isError, isSuccess, error }] =
    useAddNewServiceMutation();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();

  const handleAddService = async (data: FieldValues) => {
    setLoading(true);
    const result = await uploadImageToCloudinary(data.image[0]);
    setLoading(false);

    const newServiceData = {
      ...data,
      image: result.url,
      cost: Number(data.cost),
      slotsPerDay: Number(data.slotsPerDay),
    };

    addNewService(newServiceData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("New Service created successfully");
      reset();
    }
    if (isError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error as any)?.data?.message || "An error occured");
    }
  }, [isError, isSuccess, error, reset]);

  return (
    <div className="flex justify-center items-center h-screen mt-6">
      <div className="bg-primary-100 rounded-lg p-8 shadow-lg w-full md:w-1/2 ">
        <h1 className="text-3xl font-bold text-center text-primary-text mb-4">
          Add new service
        </h1>
        <form onSubmit={handleSubmit(handleAddService)}>
          <div className="mb-4">
            <label htmlFor="title" className="text-accent">
              Title
            </label>
            <input
              type="text"
              className="w-full p-2 rounded-lg focus:outline-none input input-bordered"
              {...register("title", {
                required: true,
              })}
            />
            {errors.title && (
              <p className="text-[12px] text-red-500 ">Title is required</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="text-accent">
              Description
            </label>
            <textarea
              className="w-full p-2 rounded-lg textarea textarea-bordered focus:outline-none"
              rows={3}
              {...register("description", {
                required: true,
              })}
            ></textarea>
            {errors.description && (
              <p className="text-[12px] text-red-500 ">
                Description is required
              </p>
            )}

            <div className="flex items-center gap-3">
              <div className="mb-4">
                <label htmlFor="title" className="text-accent">
                  Cost
                </label>
                <input
                  type="number"
                  className="w-full p-2 rounded-lg focus:outline-none input input-bordered"
                  {...register("cost", {
                    required: true,
                  })}
                />
                {errors.cost && (
                  <p className="text-[12px] text-red-500 ">Cost is required</p>
                )}
              </div>
              <div>
                <select
                  className="select select-bordered w-full"
                  required
                  {...register("slotsPerDay", {
                    required: true,
                  })}
                >
                  <option disabled selected>
                    Slots per day
                  </option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                </select>
                {errors.slotsPerDay && (
                  <p className="text-[12px] text-red-500 ">
                    Slots per day is required{" "}
                  </p>
                )}
              </div>
            </div>

            <div>
              <select
                className="select select-bordered w-full"
                required
                {...register("status", {
                  required: true,
                })}
              >
                <option disabled selected>
                  Status
                </option>
                <option value="live">Live</option>
                <option value="upcoming">Upcoming</option>
              </select>
              {errors.status && (
                <p className="text-[12px] text-red-500 ">Status is required </p>
              )}
            </div>

            <div className="mt-3">
              <select
                className="select select-bordered w-full"
                required
                {...register("category", {
                  required: true,
                })}
              >
                <option disabled selected>
                  Category
                </option>
                {serviceCategories.map((cat, index) => (
                  <option key={index} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="text-[12px] text-red-500 ">Status is required </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-accent">Service Image</span>
              </label>
              <input
                type="file"
                className="file-input input-primary file-input-bordered file-input-sm w-full"
                required
                accept="image/*"
                {...register("image", {
                  required: true,
                })}
              />
              {errors.image && (
                <p className="text-[12px] text-red-500 ">Image is required</p>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-primary text-accent font-bold px-4 py-2 rounded-lg w-full"
              disabled={loading || isLoading}
            >
              {loading || isLoading ? "Please wait...." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
