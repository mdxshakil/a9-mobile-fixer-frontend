const BlogCardLoader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center py-6 px-3 items-stretch">
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
};

export default BlogCardLoader;

const Skeleton = () => {
  return (
    <div className="w-full pb-3 rounded-lg shadow-sm shadow-primary/50 p-2">
      <div className="flex gap-3 mt-6 items-center w-full">
        <div className="h-8 w-8 rounded-full skeleton"></div>
        <div className="flex flex-col w-full">
          <div className="h-4 w-2/12 mb-2 skeleton rounded-lg"></div>
          <div className="h-4 w-2/12 skeleton rounded-lg"></div>
        </div>
      </div>
      <div className="mt-6">
        <div className="h-4 w-5/6 mx-auto skeleton rounded-lg"></div>
        <div className="h-4 mt-3 w-5/6 mx-auto skeleton rounded-lg"></div>
      </div>
      <div className="mt-6">
        <div className="h-4 w-1/6 skeleton rounded-lg"></div>
      </div>
    </div>
  );
};
