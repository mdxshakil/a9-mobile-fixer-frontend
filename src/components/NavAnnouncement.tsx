import { IoClose } from "react-icons/io5";

const NavAnnouncement = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="md:h-[20px] h-[30px] bg-accent text-center text-primary">
      <div className="flex items-center justify-between px-4 text-xs md:text-sm font-semibold">
        <div></div>
        <p className="text-center tracking-wider">
          Don't forget to checkout our upcoming services
        </p>
        <button onClick={onClose}>
          <IoClose size={20} />
        </button>
      </div>
    </div>
  );
};

export default NavAnnouncement;
