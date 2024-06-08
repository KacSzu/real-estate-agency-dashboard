"use client";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Property } from "@prisma/client";
import { memo } from "react";
interface ITypeChart {
  properties: Property[];
}

type ProjectTypeCounts = Record<string, number>;
function DashboardTypeChart({ properties }: ITypeChart) {
  const countProjectTypes = (
    properties: Property[] | undefined
  ): ProjectTypeCounts => {
    const counts: ProjectTypeCounts = {};

    properties?.forEach((property) => {
      const { type } = property;
      if (counts[type]) {
        counts[type]++;
      } else {
        counts[type] = 1;
      }
    });

    return counts;
  };
  const projectTypeCounts = countProjectTypes(properties);
  const data = [
    {
      subject: "Villa",
      A: projectTypeCounts.Villa,
    },

    {
      subject: "Home",
      A: projectTypeCounts.Home,
    },
    {
      subject: "Flat",
      A: projectTypeCounts.Flat,
    },
  ];
  return (
    <Card className="col-span-3 ">
      <CardTitle className="p-6  tracking-tight text-sm font-medium">
        Types
      </CardTitle>
      <CardContent className="p-6 pt-0 pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart outerRadius={90} width={340} height={350} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={50} domain={[0, 10]} />
            <Radar
              name="Mike"
              dataKey="A"
              stroke="#22c55e"
              fill="#adfa1d"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default memo(DashboardTypeChart);
