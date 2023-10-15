const ActionButtons = () => {
  return (
    <div className="flex -mx-2 mb-4">
      <div className="w-1/2 px-2">
        <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">
          Add to Cart
        </button>
      </div>
      <div className="w-1/2 px-2">
        <button className="w-full bg-gray-400 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
