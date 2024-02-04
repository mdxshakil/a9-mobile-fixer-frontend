const TestimonialCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center py-6 px-3 items-stretch">
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
};

export default TestimonialCardSkeleton;

const Skeleton = () => {
  return (
    <div className="w-full rounded-lg shadow-sm shadow-primary/50 p-2">
      <div className="w-full">
        <div className="md:h-20 md:w-20 w-16 h-16 mx-auto skeleton rounded-full"></div>
      </div>
      <div className="mt-6">
        <div className="h-4 w-1/3 mx-auto skeleton rounded-lg"></div>
        <div className="h-4 mt-2 w-1/4 mx-auto skeleton rounded-lg"></div>
      </div>
      <div className="mt-6">
        <div className="h-4 w-full skeleton rounded-lg"></div>
        <div className="h-4 mt-2 w-full skeleton rounded-lg"></div>
      </div>
    </div>
  );
};
