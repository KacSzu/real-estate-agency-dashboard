"use client";
import { NAV_LINKS } from "@/lib/constants";
import Link from "next/link";
interface IMobileNav {
  onCloseModal: () => void;
}
function MobileNav({ onCloseModal }: IMobileNav) {
  return (
    <div className="p-4 min-w-[350px] sm:w-[500px] bg-background rounded-[30px] pb-[24px]">
      <nav>
        <ul className="text-2xl text-center space-y-5 font-thin">
          {NAV_LINKS.map(({ label, href }, i) => (
            <li key={i}>
              <Link onClick={() => onCloseModal()} href={href}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default MobileNav;
