import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCreateEventMutation } from "../../../redux/features/event/eventApi";

export const AddNewEventPage = () => {
  const [loading, setLoading] = useState(false);
  const [createEvent, { isLoading, isError, isSuccess, error }] =
    useCreateEventMutation();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();

  const handleAddNewEvent = async (data: FieldValues) => {
    const formData = new FormData();
    formData.append("file", data.banner[0]);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    setLoading(true);
    const res = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
      method: "post",
      body: formData,
    });
    const result = await res.json();
    setLoading(false);

    const eventDate = new Date(data.eventDate);
    const newEventdata = {
      ...data,
      banner: result.url,
      eventDate: eventDate.toISOString(),
    };

    createEvent(newEventdata);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("New event created successfully");
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
          Add new event
        </h1>
        <form onSubmit={handleSubmit(handleAddNewEvent)}>
          <div className="mb-4">
            <label htmlFor="title" className="text-primary-text">
              Event Title
            </label>
            <input
              type="text"
              className="w-full p-2 rounded-lg focus:outline-none input  input-primary"
              {...register("title", {
                required: true,
              })}
            />
            {errors.title && (
              <p className="text-[12px] text-red-500 ">Title is required</p>
            )}
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-3">
              <div className="mb-4 w-1/2">
                <label htmlFor="title" className="text-primary-text">
                  Venue
                </label>
                <input
                  type="text"
                  className="w-full p-2 rounded-lg focus:outline-none input input-bordered input-primary"
                  {...register("venue", {
                    required: true,
                  })}
                />
                {errors.venue && (
                  <p className="text-[12px] text-red-500 ">Venue is required</p>
                )}
              </div>
              <div className="w-1/2">
                <input
                  className="select select-bordered w-full"
                  type="datetime-local"
                  {...register("eventDate", {
                    required: true,
                  })}
                />
                {errors.eventDate && (
                  <p className="text-[12px] text-red-500 ">
                    Event date is required
                  </p>
                )}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Event Banner</span>
              </label>
              <input
                type="file"
                className="file-input input-primary file-input-bordered file-input-sm w-full"
                required
                accept="image/*"
                {...register("banner", {
                  required: true,
                })}
              />
              {errors.image && (
                <p className="text-[12px] text-red-500 ">Banner is required</p>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className={`btn btn-primary px-4 py-2 rounded-lg hover:bg-primary-dark w-full ${
                loading || isLoading ? "loading-bars" : ""
              }`}
              disabled={loading || isLoading}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
