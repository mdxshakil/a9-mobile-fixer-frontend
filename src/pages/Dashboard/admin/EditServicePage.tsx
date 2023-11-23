import { FieldValues, useForm } from "react-hook-form";
import {
  useEditServiceMutation,
  useGetServiceByIdQuery,
} from "../../../redux/features/service/serviceApi";

import { serviceCategories } from "../../../constants";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/Loader/LoadingSpinner";
import { uploadImageToCloudinary } from "../../../utils/imageUploader";

export const EditServicePage = () => {
  const [loading, setLoading] = useState(false);
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { data: service, isLoading } = useGetServiceByIdQuery(serviceId);
  const { title, description, cost, slotsPerDay, status, category } =
    service?.data || {};
  const { handleSubmit, register } = useForm();
  const [editService, editState] = useEditServiceMutation();

  const handleServiceEdit = async (data: FieldValues) => {
    let payload;

    if (data.image[0]) {
      setLoading(true);
      const result = await uploadImageToCloudinary(data.image[0]);
      setLoading(false);

      payload = {
        ...data,
        image: result.url,
        cost: Number(data.cost),
        slotsPerDay: Number(data.slotsPerDay),
      };
    } else {
      payload = {
        title: data.title,
        description: data.description,
        status: data.status,
        category: data.category,
        cost: Number(data.cost),
        slotsPerDay: Number(data.slotsPerDay),
      };
    }

    await editService({ payload, serviceId });
  };

  useEffect(() => {
    if (editState.isSuccess) {
      toast.success("Service info updated");
      navigate("/dashboard/manage-services");
    }
    if (editState.isError) {
      toast.error(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (editState.error as any)?.data?.message || "An error occured"
      );
    }
  }, [editState, navigate]);

  if (isLoading || editState.isLoading || loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex justify-center items-center h-screen mt-6">
      <div className="bg-primary-100 rounded-lg p-8 shadow-lg w-full md:w-1/2">
        <h1 className="text-3xl font-bold text-center text-primary-text mb-4">
          Edit service
        </h1>
        <form onSubmit={handleSubmit(handleServiceEdit)}>
          <div className="mb-4">
            <label htmlFor="title" className="text-primary-text">
              Title
            </label>
            <input
              type="text"
              className="w-full p-2 rounded-lg focus:outline-none input input-bordered"
              {...register("title")}
              defaultValue={title}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="text-primary-text">
              Description
            </label>
            <textarea
              className="w-full p-2 rounded-lg textarea textarea-bordered focus:outline-none"
              rows={3}
              {...register("description")}
              defaultValue={description}
            ></textarea>

            <div className="flex items-center gap-3">
              <div className="mb-4">
                <label htmlFor="title" className="text-primary-text">
                  Cost
                </label>
                <input
                  type="number"
                  className="w-full p-2 rounded-lg focus:outline-none input input-bordered"
                  {...register("cost")}
                  defaultValue={cost}
                />
              </div>
              <div>
                <select
                  className="select select-bordered w-full"
                  {...register("slotsPerDay")}
                  defaultValue={slotsPerDay}
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
              </div>
            </div>

            <div>
              <select
                className="select select-bordered w-full"
                {...register("status")}
                defaultValue={status}
              >
                <option disabled selected>
                  Status
                </option>
                <option value="live">Live</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>

            <div className="mt-3">
              <select
                className="select select-bordered w-full"
                {...register("category")}
                defaultValue={category}
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
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Service Image</span>
              </label>
              <input
                type="file"
                className="file-input input-primary file-input-bordered file-input-sm w-full"
                accept="image/*"
                {...register("image")}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className={`btn btn-primary px-4 py-2 rounded-lg w-full text-white`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
