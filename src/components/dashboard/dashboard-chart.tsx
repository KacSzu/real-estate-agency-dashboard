"use client";
import { Property } from "@prisma/client";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useMemo } from "react";
import { format, parseISO, subMonths } from "date-fns";
interface IDashboardChart {
  properties: Property[];
}
interface DataPoint {
  name: string;
  count: number;
}
function DashboardChart({ properties }: IDashboardChart) {
  const data = useMemo(() => {
    const months: string[] = [];
    for (let i = 11; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      months.push(format(date, "MMM"));
    }

    const countByMonth: { [key: string]: number } = months.reduce(
      (acc, month) => {
        acc[month] = 0;
        return acc;
      },
      {} as { [key: string]: number }
    );

    properties.forEach((property) => {
      const createdAt =
        typeof property.createdAt === "string"
          ? parseISO(property.createdAt)
          : property.createdAt;
      const month = format(createdAt, "MMM");
      if (countByMonth[month] !== undefined) {
        countByMonth[month] += 1;
      }
    });

    const data: DataPoint[] = months.map((month) => ({
      name: month,
      count: countByMonth[month],
    }));

    return data;
  }, [properties]);

  return (
    <Card className="col-span-4 ">
      <CardTitle className="p-6 pb-3  tracking-tight text-sm font-medium">
        Overview
      </CardTitle>
      <CardDescription className="text-xs font-semibold px-6 pb-3">
        Properties added each month
      </CardDescription>
      <CardContent className="p-6 pt-0 pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Bar dataKey="count" fill="#adfa1d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default DashboardChart;
