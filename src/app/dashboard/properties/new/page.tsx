"use client";

import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import { BREADCRUMBS_PROPERTIES_NEW } from "@/lib/constants";

import useDisableScroll from "@/hooks/use-disabled-scroll";
import DashboardPropertiesNewForm from "@/components/dashboard/properties/new/dashboard-properties-new-form";
const DashboardPropertiesAddPage = () => {
  useDisableScroll();

  return (
    <section className="space-y-4 p-6 md:p-8 flex-grow ">
      <DashboardSectionHeader
        breadcrumbs={BREADCRUMBS_PROPERTIES_NEW}
        title="Add property"
      />
      <DashboardPropertiesNewForm />
    </section>
  );
};

export default DashboardPropertiesAddPage;
