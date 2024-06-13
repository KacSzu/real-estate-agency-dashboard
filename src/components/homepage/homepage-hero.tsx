import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import { buttonVariants } from "../ui/button";
import Image from "next/image";

function HomepageHero() {
  return (
    <section className="pt-[150px] gap-4   max-w-5xl xl:max-w-6xl mx-auto px-4 py-12 grid grid-cols-12 ">
      <h1 className="text-6xl text-center flex font-bold col-span-12 md:col-span-6 lg:col-span-7 xl:col-span-8 md:text-left">
        Find Your Dream Home with Expert Guidance
        <Image
          src="/svg/svg5.svg"
          alt="svg"
          width={500}
          height={500}
          className="hidden md:block absolute  z-[-10]"
        />
      </h1>
      <div className="col-span-12 md:col-span-6 lg:col-span-5 max-w-[400px] mx-auto xl:col-span-4 flex flex-col text-center ">
        <div className="flex items-center gap-2  bg-muted/70 w-fit mx-auto   p-2 px-4 rounded-full ">
          <p className="text-base sm:text-lg text-yellow-400">★★★★★</p>
          <p className="text-sm sm:text-base font-semibold">
            5/5 Our clients reviews
          </p>
        </div>
        <div className="col-span-12 md:col-span-6 flex gap-2 bl flex-col text-center ">
          <h2 className=" text-4xl font-bold ">
            Our <span className=" font-[200]">properties</span>
          </h2>
          <div className="flex items-center gap-2 flex-col">
            <p className="text-primary/80 text-sm flex items-center">
              Discover our exclusive properties that offer the perfect blend of
              luxury and nature.
            </p>
            <Link
              href="/properties"
              className={buttonVariants({ variant: "link" })}
            >
              View more
              <HiArrowUpRight className="ml-1 h-4 w-4 " />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomepageHero;
