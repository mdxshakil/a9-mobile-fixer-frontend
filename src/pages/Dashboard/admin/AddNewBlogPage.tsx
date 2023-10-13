import { useState, FormEvent, useEffect } from "react";
import { useAddNewBlogMutation } from "../../../redux/features/blog/blogApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useGetUserFromStore from "../../../hooks/useGetUser";
import LoadingSpinner from "../../../components/Loader/LoadingSpinner";
export const AddNewBlogPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [addNewBlog, { isSuccess, isError, isLoading, error }] =
    useAddNewBlogMutation();
  const { profileId } = useGetUserFromStore();

  const handleAddNewBlog = (e: FormEvent) => {
    e.preventDefault();

    addNewBlog({ title, description, profileId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("New blog created successfully");
      navigate("/dashboard/manage-blogs");
    }
    if (isError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error as any)?.data?.message || "An error occured");
    }
  }, [isError, isSuccess, error, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-primary-100 rounded-lg p-8 shadow-lg w-full md:w-1/3 bg-base-300">
        <h1 className="text-3xl font-bold text-center text-primary-text mb-4">
          Add new blog
        </h1>
        <form onSubmit={handleAddNewBlog}>
          <div className="mb-4">
            <label htmlFor="title" className="text-primary-text">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              className="w-full p-2 rounded-lg focus:outline-none input input-bordered input-primary"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="text-primary-text">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full p-2 rounded-lg textarea textarea-primary focus:outline-none"
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className={`btn btn-primary px-4 py-2 rounded-lg hover:bg-primary-dark w-full ${
                isLoading ? "loading-infinity" : ""
              }`}
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
