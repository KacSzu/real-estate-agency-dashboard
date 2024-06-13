import { HOMEPAGE_PROPERTIES_DISPLAY_STATS_DATA } from "@/lib/constants";

const HomepagePropertiesStatisticsCard = () => (
  <div className="col-span-12 md:col-span-4 row-span-6 bg-muted shadow-md p-4 divide-y divide-black/20 rounded-xl flex flex-col h-full">
    {HOMEPAGE_PROPERTIES_DISPLAY_STATS_DATA.map((stat, index) => (
      <div key={index} className="flex-1 flex flex-col py-1 justify-center">
        <h2 className="text-3xl font-bold">{stat.value}</h2>
        <p className="mt-2 text-sm">{stat.description}</p>
      </div>
    ))}
  </div>
);

export default HomepagePropertiesStatisticsCard;
