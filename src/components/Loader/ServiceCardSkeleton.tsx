const ServiceCardLoader = ({ length }: { length: number }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center py-6 px-3 items-stretch">
      {Array(length)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="w-full rounded-lg shadow-sm shadow-primary/30 p-2"
          >
            <div>
              <div className="h-24 md:h-32 w-18 rounded-t-lg skeleton"></div>
              <div className="mt-3 pb-2 h-8 md:h-10 rounded-lg skeleton"></div>
              <div className="mt-6 flex items-center justify-between">
                <div className="h-4 w-1/3 rounded-lg skeleton"></div>
                <div className="h-4 w-1/3 rounded-lg skeleton"></div>
              </div>
              <div className="mt-6 flex items-center gap-6">
                <div className="h-4 md:h-6 w-full rounded-lg skeleton"></div>
                <div className="h-4 md:h-6 w-full rounded-lg skeleton"></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ServiceCardLoader;
