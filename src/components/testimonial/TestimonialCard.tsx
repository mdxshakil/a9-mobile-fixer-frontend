import { ITestimonial } from "../../interface";

const TestimonialCard = ({ testimonial }: { testimonial: ITestimonial }) => {
  const { profile, experience, message } = testimonial || {};
  return (
    <div className="mb-6 shadow-md rounded-md">
      <div className="mb-6 flex justify-center">
        <img
          src={profile.profilePicture}
          className="w-32 h-32 rounded-full object-cover shadow-lg dark:shadow-black/20"
          alt={profile.firstName}
        />
      </div>
      <h5 className="mb-2 text-lg font-bold">
        {profile.firstName + " " + profile.lastName}
      </h5>
      <h6 className="mb-4 font-medium font-mono uppercase leading-loose text-primary dark:text-primary-400">
        {experience}
      </h6>
      <p className="mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 96 960 960"
          className="inline-block w-6"
          transform="rotate(180)"
        >
          <path
            fill="currentColor"
            d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z"
          />
        </svg>
        {message}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 96 960 960"
          className="inline-block w-6"
        >
          <path
            fill="currentColor"
            d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z"
          />
        </svg>
      </p>
    </div>
  );
};

export default TestimonialCard;
