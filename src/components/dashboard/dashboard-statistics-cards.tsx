import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Property, User } from "@prisma/client";
import { ReactNode, memo } from "react";
import { FiDollarSign } from "react-icons/fi";
import { HiOutlineBuildingLibrary, HiOutlineUsers } from "react-icons/hi2";

interface IDashboardStatisticCard {
  label: string;
  value: string | number;
  icon: ReactNode;
}

function DashboardStatisticCard({
  label,
  value,
  icon,
}: IDashboardStatisticCard) {
  return (
    <Card>
      <CardTitle className="p-6 flex flex-row items-center tracking-tight text-sm font-medium justify-between space-y-0 pb-2">
        {label}
        <span className="text-xl ">{icon}</span>
      </CardTitle>
      <CardContent className="text-lg font-bold">{value}</CardContent>
    </Card>
  );
}

interface IDashboardStatisticsCards {
  properties: Property[];
  users: User[];
}
function DashboardStatisticsCards({
  properties,
  users,
}: IDashboardStatisticsCards) {
  const totalValue = properties.reduce(
    (sum, property) => sum + property.price,
    0
  );
  const totalProperties = properties.length;
  const totalUsers = users.length;
  const STATISTICS_CARDS_OPTIONS = [
    {
      label: "Total value",
      value: formatCurrency(totalValue),
      icon: <FiDollarSign />,
    },
    {
      label: "Total properties",
      value: totalProperties,
      icon: <HiOutlineBuildingLibrary />,
    },
    { label: "Total users", value: totalUsers, icon: <HiOutlineUsers /> },
    { label: "Total value", value: "45000", icon: <FiDollarSign /> },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {STATISTICS_CARDS_OPTIONS.map(({ label, value, icon }, i) => (
        <DashboardStatisticCard
          key={i}
          label={label}
          value={value}
          icon={icon}
        />
      ))}
    </div>
  );
}

export default memo(DashboardStatisticsCards);
