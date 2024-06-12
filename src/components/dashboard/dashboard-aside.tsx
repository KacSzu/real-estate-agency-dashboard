"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineUser,
  HiOutlineTableCells,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";

export const DASHBOARD_NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: <HiOutlineTableCells /> },
  {
    label: "Properties",
    href: "/dashboard/properties",
    icon: <HiOutlineBuildingOffice2 />,
  },
  { label: "Users", href: "/dashboard/users", icon: <HiOutlineUser /> },
];

function DashboardAside() {
  const pathname = usePathname();

  return (
    <aside className="hidden flex-shrink-0 relative  md:flex flex-col w-[20%] max-w-[230px] border-r border-gray-300 py-8">
      <nav>
        <ul className="space-y-2 p-4 text-sm tracking-tight font-semibold">
          {DASHBOARD_NAV_LINKS.map(({ label, href, icon }, i) => (
            <li
              key={i}
              className={`rounded-md font-[500]  ${
                pathname === href ? "bg-muted" : "hover:bg-muted/80"
              }`}
            >
              <Link href={href} className="flex p-2 items-center gap-4">
                <span className="text-xl">{icon}</span>
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default DashboardAside;
