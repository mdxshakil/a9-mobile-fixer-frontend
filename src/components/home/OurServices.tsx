import { Link } from "react-router-dom";
import { IService } from "../../interface";
import { useGetHomePageServicesQuery } from "../../redux/features/service/serviceApi";
import LoadingSpinner from "../Loader/LoadingSpinner";
import ServiceCard from "../ServiceCard";
import ErrorElement from "../shared/ErrorElement";
import NoContantFound from "../shared/NoContantFound";

const OurServices = () => {
  const {
    data: services,
    isLoading,
    isError,
  } = useGetHomePageServicesQuery(undefined);

  let content;
  if (isLoading) {
    return <LoadingSpinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load data." />;
  } else if (!isLoading && !isError && services?.data?.length === 0) {
    content = <NoContantFound message="No data available" />;
  } else if (!isLoading && !isError && services?.data?.length > 0) {
    content = services?.data?.map((service: IService) => (
      <ServiceCard key={service.id} service={service} />
    ));
  }

  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-center mt-12">Our services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center py-6 px-3 items-stretch">
        {content}
      </div>
      <Link to={"/all-services"}>
        <button className="btn btn-sm mt-3">Browse all services</button>
      </Link>
    </div>
  );
};

export default OurServices;
