import { AiFillMobile } from "react-icons/ai";
type IProps = {
  title: string;
  description: string;
  iconAlignment: string;
};
const FeatureLeft = ({ title, description, iconAlignment }: IProps) => {
  return (
    <div className={`flex flex-col-reverse ${iconAlignment} gap-10 md:gap-20`}>
      <div
        className={`flex flex-col-reverse md:flex-row gap-4 md:gap-8 md:items-${iconAlignment} items-center`}
      >
        <div>
          <h2
            className={`text-center text-accent md:text-${
              iconAlignment === "start" ? "left" : "right"
            } font-bold text-xl`}
          >
            {title}
          </h2>
          <p
            className={`text-center text-sm md:text-${
              iconAlignment === "start" ? "left" : "right"
            }`}
          >
            {description}
          </p>
        </div>
        <div>
          <div className="bg-primary p-2 rounded-full">
            <AiFillMobile size={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureLeft;
