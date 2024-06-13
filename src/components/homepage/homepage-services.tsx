import { HOMEPAGE_SERVICES_DATA } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { HiArrowUpRight } from "react-icons/hi2";

function HomepageServices() {
  return (
    <section className="px-4 py-12 flex flex-col gap-8 max-w-5xl xl:max-w-6xl mx-auto">
      <div className="  flex  justify-center ">
        <h2 className="text-4xl">
          What <span className="font-[200]">do</span>
          <br></br>
          We <span className="font-[200]">offer</span>
        </h2>
      </div>
      <div className="grid grid-cols-12 gap-2">
        {HOMEPAGE_SERVICES_DATA.map((service, i) => (
          <div
            key={i}
            className=" col-span-12 sm:col-span-4 flex items-center justify-between border p-2 rounded-xl z-10 bg-white shadow-md"
          >
            <Image
              src={service.svg}
              width={112}
              height={112}
              alt={service.alt}
            />
            <Link
              href={service.href}
              className={cn(
                buttonVariants({ variant: "link" }),
                "text-lg sm:p-0 md:p-2 "
              )}
            >
              <span>{service.title}</span>
              <HiArrowUpRight className="ml-2 h-4 w-4  " />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomepageServices;
