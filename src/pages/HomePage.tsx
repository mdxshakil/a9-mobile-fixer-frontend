import ServiceCard from "../components/ServiceCard";

const HomePage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center py-6">
      <ServiceCard />
      <ServiceCard />
      <ServiceCard />
      <ServiceCard />
      <ServiceCard />
      <ServiceCard />
    </div>
  );
};

export default HomePage;
