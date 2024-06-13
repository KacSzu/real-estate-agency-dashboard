"use client";
import { HOMEPAGE_WHY_US_STATS } from "@/lib/constants";
import Image from "next/image";
import CountUp from "react-countup";
function HomepageWhyUs() {
  return (
    <section className="relative px-4 py-12 max-w-5xl xl:max-w-6xl mx-auto">
      <Image
        src="/svg/svg7.svg"
        alt="svg"
        width={450}
        height={450}
        className="md:block -left-40 -top-10 absolute  z-[-10]"
      />
      <div className="flex justify-between items-center divide-x divide-black">
        {HOMEPAGE_WHY_US_STATS.map((stat, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center justify-center text-center gap-2 sm:gap-4 px-4"
          >
            <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold">
              <CountUp end={stat.number} duration={5} />+
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
