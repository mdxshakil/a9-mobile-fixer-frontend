const Header = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <>
      <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
      <p className="text-accent text-sm mb-4">{description}</p>
    </>
  );
};

export default Header;
