import { NAV_LINKS } from "@/lib/constants";
import Link from "next/link";
import React from "react";

function DesktopNav() {
  return (
    <nav className="col-span-10 pr-8">
      <ul className="flex gap-10 ">
        {NAV_LINKS.map(({ label, href }, i) => (
          <li key={i} className="font-thin text-xl">
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default DesktopNav;
