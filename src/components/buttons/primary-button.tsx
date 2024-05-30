import Link from "next/link";
import React from "react";
import { CgArrowLongRightR } from "react-icons/cg";
interface IPrimaryButton {
  text: string;
  href: string;
}
function PrimaryButton({ text, href }: IPrimaryButton) {
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
}

export default PrimaryButton;
