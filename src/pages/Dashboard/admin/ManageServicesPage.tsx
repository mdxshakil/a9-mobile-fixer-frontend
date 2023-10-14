import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/Loader/LoadingSpinner";
import ErrorElement from "../../../components/shared/ErrorElement";
import NoContantFound from "../../../components/shared/NoContantFound";
import { IService } from "../../../interface";
import {
  useDeleteServiceMutation,
  useGetDashboardServicesQuery,
} from "../../../redux/features/service/serviceApi";
import { deleteConfirmationModal } from "../../../utils/deleteConfirmationModal";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ManageServicesPage = () => {
  const {
    data: services,
    isLoading,
    isError,
  } = useGetDashboardServicesQuery(undefined);
  const [deleteService, deleteState] = useDeleteServiceMutation();

  const handleServiceDelete = async (serviceId: string) => {
    deleteConfirmationModal(
      "Are you sure?",
      "You won't be able to revert this!",
      () => deleteService(serviceId)
    );
  };

  useEffect(() => {
    if (deleteState.isSuccess) {
      toast.success("Action succed!");
    }
    if (deleteState.isError) {
      toast.error("Action failed.Try again");
    }
  }, [deleteState]);

  if (deleteState.isLoading) {
    return <LoadingSpinner />;
  }

  let content;
  if (isLoading) {
    return <LoadingSpinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load faqs." />;
  } else if (!isLoading && !isError && services?.data?.length === 0) {
    content = <NoContantFound message="No faqs available" />;
  } else if (!isLoading && !isError && services?.data?.length > 0) {
    content = (
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services?.data?.map((service: IService) => (
              <tr key={service.id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={service.image} alt={service.category} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{service.title}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="badge badge-outline">{service.category}</div>
                </td>
                <td>
                  <div className="badge badge-primary">{service.status}</div>
                </td>
                <td className="flex gap-2">
                  <Link to={`/dashboard/edit-service/${service.id}`}>
                    <button>
                      <FaEdit size={20} />
                    </button>
                  </Link>
                  <button onClick={() => handleServiceDelete(service.id)}>
                    <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <div className="py-3 px-2">
        <Link to="/dashboard/add-service">
          <button className="btn btn-sm btn-primary ">
            Add New Service <FaPlus />
          </button>
        </Link>
      </div>
      <div className="px-2">{content}</div>
    </div>
  );
};

export default ManageServicesPage;
