import Image from "next/image";
import HomepageInput from "./homepage-input";

function HomepageHero() {
  return (
    <section className="relative flex items-center justify-center h-screen overflow-hidden ">
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="z-10 text-center text-white flex flex-col items-center gap-4 p-6 text-shadow">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl max-w-[80%] sm:max-w-[70%] lg:max-w-[60%] ">
          Find Your Dream Home
        </h1>
        <HomepageInput />
        <p className="max-w-[80%] sm:max-w-[70%] lg:max-w-[60%] text-sm sm:text-base lg:text-lg ">
          Explore a wide range of properties tailored to meet your needs and
          lifestyle. Whether you&apos;re looking for a cozy apartment in the
          city or a spacious family home in the suburbs, we have something for
          everyone.
        </p>
      </div>
      <Image
        src="/hero2.jpg"
        fill
        alt="hero"
        objectFit="cover"
        className="z-0 absolute inset-0 brightness-50"
      />
    </section>
  );
}

export default HomepageHero;
