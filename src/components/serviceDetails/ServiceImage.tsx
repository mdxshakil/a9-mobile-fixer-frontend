const ServiceImage = ({ image }: { image: string }) => {
  return (
    <div className="h-[250px] md:h-[460px] rounded-lg mb-4">
      <img
        className="w-full h-full object-cover"
        src={image}
        alt="Product Image"
      />
    </div>
  );
};

export default ServiceImage;
