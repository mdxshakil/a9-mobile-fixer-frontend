/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FormEvent, useEffect } from "react";
import {
  useEditBlogMutation,
  useGetBlogByIdQuery,
} from "../../../redux/features/blog/blogApi";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/Loader/LoadingSpinner";

export const EditBlogPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { blogId } = useParams();

  const { data: blog, isLoading } = useGetBlogByIdQuery(blogId);
  const [editBlog, editState] = useEditBlogMutation();

  useEffect(() => {
    setTitle(blog?.data?.title);
    setDescription(blog?.data?.description);
  }, [blog?.data?.description, blog?.data?.title]);

  const handleEditBlog = (e: FormEvent) => {
    e.preventDefault();
    const updatedData = {
      title,
      description,
    };
    editBlog({ blogId, updatedData });
  };

  useEffect(() => {
    if (editState.isSuccess) {
      toast.success("Blog updated successfully");
      navigate("/dashboard/manage-blogs");
    }
    if (editState.isError) {
      toast.error(
        (editState.error as any)?.data?.message || "An error occured"
      );
    }
  }, [editState, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex justify-center items-center mt-3">
      <div className="rounded-lg px-3 w-full md:w-1/3">
        <h1 className="text-3xl font-bold text-center text-primary-text mb-4">
          Edit blog
        </h1>
        <form onSubmit={handleEditBlog}>
          <div className="mb-4">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              className="w-full p-2 rounded-lg focus:outline-none input input-bordered"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="w-full p-2 rounded-lg textarea textarea-bordered focus:outline-none"
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-primary px-4 py-2 rounded-lg hover:bg-primary-dark w-full text-accent"
              disabled={editState.isLoading}
            >
              {editState.isLoading ? "Please wait..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
