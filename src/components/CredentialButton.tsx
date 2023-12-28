
type IProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

export default function CredentialButton({ label, isActive, onClick }: IProps) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-xs ${isActive ? "btn-primary text-white" : ""}`}
      type="button"
    >
      {label}
    </button>
  );
}
