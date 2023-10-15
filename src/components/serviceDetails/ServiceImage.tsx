const ServiceImage = ({ image }: { image: string }) => {
  return (
    <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
      <img
        className="w-full h-full object-cover"
        src={image}
        alt="Product Image"
      />
    </div>
  );
};

export default ServiceImage;
