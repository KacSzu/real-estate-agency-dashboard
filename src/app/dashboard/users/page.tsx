import { Button } from "@/components/ui/button";
import DashboardBreadcrumbs from "@/components/ui/dashboard-breadcrumb";
import React from "react";
import { HiPlus } from "react-icons/hi2";
function DashboardUsers() {
  const breadcrumbsUsers = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Users", link: "/dashboard/users" },
  ];
  return (
    <section className="space-y-4 p-6 md:p-8">
      <DashboardBreadcrumbs breadcrumbs={breadcrumbsUsers} />
      <div className="flex justify-between">
        <h2 className="text-4xl font-bold tracking-tight">Users (10)</h2>
        <Button className="space-x-2">
          <span className="text-background text-lg">
            <HiPlus />
          </span>
          <span>Add user</span>
        </Button>
      </div>
    </section>
  );
}

export default DashboardUsers;
