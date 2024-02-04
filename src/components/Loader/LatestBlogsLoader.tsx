const LatestBlogLoader = () => {
  return (
    // @ts-ignore }
    <div className="container py-12 md:py-18 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 place-items-center">
        {/* featured */}
        <div className="col-span-12 md:col-span-8 p-3 w-full">
          <div className="mt-3 rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div className="lg:pl-16">
              <div className="flex items-center mb-6 w-full">
                <div className="md:w-16 w-10 md:h-16 h-10 rounded-full mr-4 skeleton"></div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="w-1/6 h-4 skeleton"></div>
                  <div className="w-1/6 h-4 skeleton"></div>
                </div>
              </div>
              <div className="w-full mb-3 h-6 skeleton"></div>
              <div className="w-full h-3 mb-2 skeleton"></div>
              <div className="w-full h-3 mb-2 skeleton"></div>
              <div className="w-full h-3 mb-6 skeleton"></div>
              <div className="w-1/12 h-3 skeleton"></div>
            </div>
          </div>
        </div>
        {/* featured */}

        <div className="col-span-12 md:col-span-4 p-3 flex flex-col gap-y-2 w-full">
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    </div>
  );
};

export default LatestBlogLoader;

const Skeleton = () => {
  return (
    <div className="lg:pl-12 mb-3">
      <div className="flex items-center mb-2 w-full">
        <div className="md:w-16 md:h-16 w-10 h-10 rounded-full mr-4 skeleton"></div>
        <div className="flex flex-col gap-2 w-full">
          <div className="w-1/3 h-4 skeleton"></div>
          <div className="w-1/3 h-4 skeleton"></div>
        </div>
      </div>
      <div className="w-full h-4 mb-3 skeleton"></div>
      <div className="w-full h-3 mb-3 skeleton"></div>
      <div className="w-1/12 h-3 skeleton"></div>
    </div>
  );
};
