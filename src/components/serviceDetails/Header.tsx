const Header = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
    </>
  );
};

export default Header;
