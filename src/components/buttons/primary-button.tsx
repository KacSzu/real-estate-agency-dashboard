import Link from "next/link";
import React from "react";
import { CgArrowLongRightR } from "react-icons/cg";
interface IPrimaryButton {
  text: string;
  href?: string;
  type?: "button" | "submit" | "reset" | undefined;
}
function PrimaryButton({ text, href, type }: IPrimaryButton) {
  if (href) {
    return (
      <Link
        href={href}
        className="bg-muted rounded-full  flex items-center pl-2 pr-3 py-2 gap-2 shadow-xl"
      >
        <span className="text-2xl bg-green-400 rounded-full p-1">
          <CgArrowLongRightR />
        </span>
        <span className="text-xs uppercase font-semibold">{text}</span>
      </Link>
    );
  } else {
    return (
      <button
        type={type}
        className="bg-muted rounded-full  flex  items-center pl-2 pr-3 py-2 gap-2 shadow-xl w-full"
      >
        <span className="text-2xl bg-green-400 rounded-full p-1">
          <CgArrowLongRightR />
        </span>
        <span className="text-xs uppercase font-semibold flex-1 ">{text}</span>
      </button>
    );
  }
}

export default PrimaryButton;
