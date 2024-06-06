import DashboardUsersRegisterForm from "@/components/dashboard/users/new/dashboard-users-register-form";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import { BREADCRUMBS_USERS_NEW } from "@/lib/constants";

function DashboardUsersNewPage() {
  return (
    <section className="space-y-4 p-6 md:p-8">
      <DashboardSectionHeader
        breadcrumbs={BREADCRUMBS_USERS_NEW}
        title="Add User"
      />
      <DashboardUsersRegisterForm />
    </section>
  );
}

export default DashboardUsersNewPage;
