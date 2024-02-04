import { useSearchParams } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
import PaginationButton from "../components/pagination/PaginationButton";
import { serviceCategories } from "../constants";
import { IService } from "../interface";
import { useGetAllServiceQuery } from "../redux/features/service/serviceApi";
import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import ErrorElement from "../components/shared/ErrorElement";
import NoContantFound from "../components/shared/NoContantFound";
import ServiceCardLoader from "../components/Loader/ServiceCardSkeleton";

const AllServicesPage = () => {
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm);
  const [category, setCategory] = useState("");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("searchText");

  const {
    data: services,
    isLoading,
    isError,
  } = useGetAllServiceQuery({
    page,
    limit: 8,
    sortBy: "cost",
    sortOrder,
    searchTerm: debouncedSearchTerm,
    category,
  });

  useEffect(() => {
    if (query) {
      setSearchTerm(query as string);
    }
  }, [query]);

  const isPreviousButtonDisabled = page === 1;
  const isNextButtonDisabled = page === services?.data?.meta?.pageCount;

  let content;
  if (isLoading) {
    content = <ServiceCardLoader length={4} />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load services." />;
  } else if (!isLoading && !isError && services?.data?.data?.length === 0) {
    content = <NoContantFound message="No services available" />;
  } else if (!isLoading && !isError && services?.data?.data?.length > 0) {
    content = (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center py-6 px-3">
        {services?.data?.data?.map((service: IService) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-3xl md:text-4xl font-bold text-center mt-3">
          Our available services
        </h1>
        <input
          type="text"
          placeholder="Display repair..."
          value={searchTerm}
          className="input input-bordered input-sm w-full max-w-xs"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex gap-3 px-3">
        <div className="mt-3">
          <select
            className="select select-bordered w-full max-w-xs"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="" disabled>
              Price
            </option>
            <option value="asc">Low to high</option>
            <option value="desc">High to low</option>
          </select>
        </div>

        <div className="mt-3">
          <select
            className="select select-bordered w-full max-w-xs"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Category
            </option>
            <option value="">All</option>
            {serviceCategories.map((cat, index) => (
              <option key={index} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {content}
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
