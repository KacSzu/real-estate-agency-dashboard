import { WHY_US_STATS } from "@/lib/constants";

function HomepageWhyUs() {
  return (
    <section className="px-4 py-12 max-w-5xl xl:max-w-6xl mx-auto">
      <div className="flex justify-between items-center divide-x divide-black">
        {WHY_US_STATS.map((stat, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center justify-center text-center gap-2 sm:gap-4 px-4"
          >
            <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold">
              {stat.number}+
            </div>
            <div className="text-xs md:text-sm uppercase font-semibold">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomepageWhyUs;
