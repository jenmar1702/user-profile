import Link from "next/link";
import { ReactNode } from "react";

export default function Button({
  children,
  onClick,
  type = "button",
  isDisabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  isDisabled: boolean;
}) {
  return (
    <button
      className="w-full mt-4 px-8 py-2 border-none rounded-[47px] bg-green shadow-[1px_1px_5px_0px_#9d9d9d] text-white disabled:bg-gray-600"
      disabled={isDisabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
