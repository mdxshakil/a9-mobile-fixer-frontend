const Header = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold mb-1">{title}</h2>
      <p className="text-accent text-sm">{description}</p>
    </div>
  );
};

export default Header;
