import { ITestimonial } from "../../interface";

const TestimonialCard = ({ testimonial }: { testimonial: ITestimonial }) => {
  const { profile, experience, message } = testimonial || {};
  return (
    <div className="mb-6 rounded-lg transition-all shadow-sm shadow-primary/50 mx-2 md:mx-3 testimonial-card">
      <div className="flex justify-center mt-3">
        <img
          src={profile.profilePicture}
          className="w-16 md:w-20 h-16 md:h-20 rounded-full object-cover shadow-lg shadow-primary/20 my-3"
          alt={profile.firstName}
        />
      </div>
      <h5 className="text-lg font-bold text-accent">
        {profile.firstName + " " + profile.lastName}
      </h5>
      <h6 className="font-medium font-mono uppercase text-primary">
        {experience.split("_").join(" ")}
      </h6>
      <p className="text-accent p-3 text-sm">
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
