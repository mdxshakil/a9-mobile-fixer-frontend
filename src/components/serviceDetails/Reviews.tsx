const Reviews = () => {
  return (
    <>
      <p className="text-xl font-bold">Reviews</p>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div className="chat-header">Obi-Wan Kenobi</div>
        <div className="chat-bubble">You were the Chosen One!</div>
        <div className="chat-footer opacity-50 text-xs">12-10-23</div>
      </div>
    </>
  );
};

export default Reviews;
