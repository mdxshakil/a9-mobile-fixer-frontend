const EventCardLoader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center py-6 px-3 items-stretch">
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
};

export default EventCardLoader;

const Skeleton = () => {
  return (
    <div className="w-full h-36 md:h-52 rounded-lg shadow-sm shadow-primary/50 p-2">
      <div className="flex gap-12 mt-6">
        <div className="h-8 w-2/3 skeleton rounded-lg"></div>
        <div className="h-8 w-1/3 skeleton rounded-lg"></div>
      </div>
      <div className="mt-6">
        <div className="h-4 w-5/6 mx-auto skeleton rounded-lg"></div>
        <div className="h-4 mt-3 w-5/6 mx-auto skeleton rounded-lg"></div>
      </div>
      <div className="mt-6">
        <div className="h-4 w-1/6 skeleton rounded-lg"></div>
        <div className="h-4 mt-2 w-1/6 skeleton rounded-lg"></div>
      </div>
    </div>
  );
};
