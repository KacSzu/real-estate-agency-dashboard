import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import { BREADCRUMBS_USERS } from "@/lib/constants";
import React from "react";
function DashboardUsers() {
  return (
    <section className="space-y-4 p-6 md:p-8">
      <DashboardSectionHeader
        breadcrumbs={BREADCRUMBS_USERS}
        title="Users"
        buttonLabel="New user"
        href="/dashboard/users/new"
      />
    </section>
  );
}

export default DashboardUsers;
