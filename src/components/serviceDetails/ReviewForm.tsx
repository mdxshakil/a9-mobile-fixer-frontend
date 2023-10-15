import { AiOutlineSend } from "react-icons/ai";

const ReviewForm = () => {
  return (
    <div>
      <p className="text-xl font-bold">Leave your review here</p>
      <form className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <button type="submit" className="">
          <AiOutlineSend size={25} />
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
