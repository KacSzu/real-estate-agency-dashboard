import { NAV_LINKS } from "@/lib/constants";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

function DesktopNav() {
  return (
    <nav className="col-span-10 pr-8">
      <ul className="flex gap-10 ">
        {NAV_LINKS.map(({ label, href }, i) => (
          <li
            key={i}
            className={cn(buttonVariants({ variant: "link" }), "p-0")}
          >
            <Link className="p-1" href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default DesktopNav;
