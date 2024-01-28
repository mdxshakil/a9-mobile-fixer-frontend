type IProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

export default function CredentialButton({ label, isActive, onClick }: IProps) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-xs btn-primary mr-3 ${
        isActive ? "btn-primary" : "text-accent btn-outline"
      }`}
      type="button"
    >
      {label}
    </button>
  );
}
