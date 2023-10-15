import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../components/Loader/LoadingSpinner";
import ServiceCard from "../components/ServiceCard";
import PaginationButton from "../components/pagination/PaginationButton";
import { serviceCategories } from "../constants";
import { IService } from "../interface";
import { useGetAllServiceQuery } from "../redux/features/service/serviceApi";
import { useState, useEffect } from "react";

const AllServicesPage = () => {
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("searchText");

  const { data: services, isLoading } = useGetAllServiceQuery({
    page,
    limit: 6,
    sortBy: "cost",
    sortOrder,
    searchTerm,
    category,
  });

  useEffect(() => {
    if (query) {
      setSearchTerm(query as string);
    }
  }, [query]);

  const isPreviousButtonDisabled = page === 1;
  const isNextButtonDisabled = page === services?.data?.meta?.pageCount;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-4xl font-bold text-center mt-3">
          Our available services
        </h1>
        <input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          className="input input-bordered input-sm w-full max-w-xs"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex gap-3 px-3">
        <div className="mt-3">
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option disabled selected>
              Price
            </option>
            <option value="asc">Low to high</option>
            <option value="desc">High to low</option>
          </select>
        </div>

        <div className="mt-3">
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option disabled selected>
              Category
            </option>
            {serviceCategories.map((cat) => (
              <option value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center py-6 px-3 items-stretch">
        {services?.data?.data?.map((service: IService) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      <PaginationButton
        setPage={setPage}
        isPreviousButtonDisabled={isPreviousButtonDisabled}
        isNextButtonDisabled={isNextButtonDisabled}
        currentPage={page}
      />
    </div>
  );
};

export default AllServicesPage;
