import DashboardUsersTable from "@/components/dashboard/users/dashboard-users-table";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import { BREADCRUMBS_USERS } from "@/lib/constants";
import prisma from "@/lib/db";
import React from "react";
async function fetchUsers() {
  const users = await prisma.user.findMany();

  const totalUsers = await prisma.user.count();
  return { users, totalUsers };
}
async function DashboardUsers() {
  const { users, totalUsers } = await fetchUsers();
  return (
    <section className="space-y-4 p-6 md:p-8">
      <DashboardSectionHeader
        count={totalUsers}
        breadcrumbs={BREADCRUMBS_USERS}
        title="Users"
        buttonLabel="New user"
        href="/dashboard/users/new"
      />
      <DashboardUsersTable users={users} />
    </section>
  );
}

export default DashboardUsers;
