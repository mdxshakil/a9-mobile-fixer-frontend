import { IService } from "../interface";

const ServiceCard = ({ service }: { service: IService }) => {
  const { title, image, cost, category } = service || {};
  return (
    <div className="card border bg-base-100 shadow-xl">
      <figure>
        <img
          src={image}
          alt="Shoes"
          className="w-96 h-56 object-cover p-2 rounded-2xl"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="badge badge-primary badge-outline">{category}</div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-1 place-items-center">
            <p className="text-xl font-bold">{cost}</p>
            <p className="text-sm">bdt</p>
          </div>
          <button className="btn btn-primary btn-sm rounded-full">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
