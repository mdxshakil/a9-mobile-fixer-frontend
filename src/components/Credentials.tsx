
export default function Credentials({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center">
        <p className="text-sm">Email: {email}</p>
        <button type="button" className="btn btn-xs">
          Copy
        </button>
      </div>
      <div className="flex items-center">
        <p className="text-sm">Password: {password}</p>
        <button type="button" className="btn btn-xs">
          Copy
        </button>
      </div>
    </div>
  );
}
