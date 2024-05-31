"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

interface IDashboardBreadcrumbs {
  breadcrumbs: {
    title: string;
    link: string;
  }[];
}

function DashboardBreadcrumbs({ breadcrumbs }: IDashboardBreadcrumbs) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <Link href={breadcrumb.link}>{breadcrumb.title}</Link>
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default DashboardBreadcrumbs;
