import { HomepageOurAgentsCarousel } from "./properties-display/homepage-our-agents-carousel";

function HomepageOurAgents() {
  const images = ["/agents/3.jpg", "/agents/2.jpg", "/agents/1.jpg"];
  return (
    <section className="relative px-4 py-12 grid gap-8 grid-cols-12 md:items-center max-w-5xl xl:max-w-6xl mx-auto">
      <div className="space-y-4 col-span-12 text-center sm:text-left sm:col-span-6 md:col-span-7">
        <h2 className="text-4xl ">
          Our <span className="font-[200]">agents</span>
        </h2>
        <p className="text-base">
          Meet our dedicated team of real estate professionals. Our agents are
          committed to providing exceptional service and personalized guidance
          to help you find the perfect property. With extensive knowledge of the
          local market and a passion for real estate, our agents are here to
          make your buying or selling experience seamless and successful.
        </p>
      </div>
      <div className="col-span-12 sm:col-span-6 md:col-span-5">
        <HomepageOurAgentsCarousel images={images} />
      </div>
    </section>
  );
}

export default HomepageOurAgents;
