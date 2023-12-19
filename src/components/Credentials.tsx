/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import toast from "react-hot-toast";
import { BiCopy } from "react-icons/bi";

export default function Credentials({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  // @ts-ignore
  const [emailCopySuccess, setEmailCopySuccess] = useState(false);
  // @ts-ignore
  const [passwordCopySuccess, setPasswordCopySuccess] = useState(false);

  const copyToClipBoard = async (
    copyMe: string,
    type: "email" | "password"
  ) => {
    await navigator.clipboard.writeText(copyMe);
    if (type === "email") {
      setEmailCopySuccess(true);
      toast.success("Email copied to clipboard");
    } else if (type === "password") {
      setPasswordCopySuccess(true);
      toast.success("Password copied to clipboard");
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center">
        <p className="text-sm">Email: {email}</p>
        <button
          type="button"
          className="btn btn-xs"
          onClick={() => copyToClipBoard(email, "email")}
        >
          <BiCopy />
        </button>
      </div>
      <div className="flex items-center">
        <p className="text-sm">Password: {password}</p>
        <button
          type="button"
          className="btn btn-xs"
          onClick={() => copyToClipBoard(password, "password")}
        >
          <BiCopy />
        </button>
      </div>
    </div>
  );
}
