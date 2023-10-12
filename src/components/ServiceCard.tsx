import RatingStar from "./RatingStar";

const ServiceCard = () => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <a href="#">
        <img
          className="p-6 rounded-3xl"
          src="https://www.fonehouse.co.uk/blog/wp-content/uploads/2023/01/Screen-Repairs-Header.jpg"
          alt="service image"
        />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
          </h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex">
            <RatingStar />
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
            5.0
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900">$599</span>
          <a href="#" className="btn btn-primary btn-sm rounded-full">
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
