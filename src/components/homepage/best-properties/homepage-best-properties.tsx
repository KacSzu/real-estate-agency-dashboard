import PrimaryButton from "@/components/buttons/primary-button";
import { HomepageBestPropertiesCarousel } from "./homepage-best-properties-carousel";

function HomepageBestProperties() {
  const images = [
    "/best-properties/best3.jpg",
    "/best-properties/best1.jpg",
    "/best-properties/best2.jpg",
  ];
  return (
    <section className="px-4 py-12 grid gap-8 grid-cols-12 lg:items-center max-w-5xl xl:max-w-6xl mx-auto">
      <div className="space-y-4 col-span-12 sm:col-span-7 ">
        <h2 className="text-4xl">
          Our <span className="font-[200]">properties</span>
        </h2>
        <p className="text-base">
          Discover our exclusive properties that offer the perfect blend of
          luxury and nature. Each of our carefully curated properties provides
          an unforgettable experience, whether you&apos;re looking for a cozy
          cabin or a spacious retreat.
        </p>
        <div className="w-[150px]">
          <PrimaryButton text="Explore more" href="/properties" />
        </div>
      </div>
      <div className="col-span-12 sm:col-span-5 ">
        <HomepageBestPropertiesCarousel images={images} />
      </div>
    </section>
  );
}

export default HomepageBestProperties;
