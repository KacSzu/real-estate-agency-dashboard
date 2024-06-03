import { Button, buttonVariants } from "@/components/ui/button";
import DashboardBreadcrumbs from "@/components/ui/dashboard-breadcrumb";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { memo } from "react";
import { HiPlus } from "react-icons/hi2";
interface IDashboardSectionHeader {
  breadcrumbs: {
    title: string;
    link: string;
  }[];
  title: string;
  buttonLabel?: string;
  href?: string;
}
function DashboardSectionHeader({
  breadcrumbs,
  title,
  buttonLabel,
  href,
}: IDashboardSectionHeader) {
  return (
    <>
      <DashboardBreadcrumbs breadcrumbs={breadcrumbs} />
      <div className="flex justify-between">
        <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
        {href && (
          <Link
            href={href as string}
            className={cn(buttonVariants({ variant: "default" }), "space-x-2")}
          >
            <span className="text-background text-lg">
              <HiPlus />
            </span>
            <span>{buttonLabel}</span>
          </Link>
        )}
      </div>
    </>
  );
}

export default memo(DashboardSectionHeader);
